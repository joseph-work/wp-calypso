/**
 * External dependencies
 */
import intersection from 'lodash/intersection';
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import sitesFactory from 'lib/sites-list';
import Dispatcher from 'dispatcher';

const _cache = {};
const _canonicalCache = {};
const TTL_IN_MS = 5 * 60 * 1000; // five minutes
const sites = sitesFactory();
const PostsListCache = { get: get };
const debug = debugFactory( 'calypso:posts-list:cache' );

function isStale( list ) {
	const now = new Date().getTime();
	const { timeSaved } = list;
	return ( now - timeSaved ) > TTL_IN_MS;
}

function get( listKey ) {
	if ( _cache[ listKey ] && ! isStale( _cache[ listKey ] ) && ! _cache[ listKey ].dirty ) {
		return _cache[ listKey ].list;
	}

	// Delete the dirty cache to force a request for new data
	if ( _cache[ listKey ] && _cache[ listKey ].dirty ) {
		debug( 'delete cached list %o', listKey );
		delete _cache[ listKey ];
		delete _canonicalCache[ listKey ];
	}
}

function set( list ) {
	const listKey = getCacheKey( list.query );

	// To make sure that a list marked dirty is reset the next time
	// it is retrieved we skip updating entries that are dirty
	if ( ! _cache[ listKey ] || ! _cache[ listKey ].dirty ) {
		_cache[ listKey ] = {
			timeStored: new Date().getTime(),
			dirty: false,
			list,
			listKey,
		};
	}
}

function markDirty( post, oldStatus ) {
	const site = sites.getSite( post.site_ID );
	const affectedSites = [ site.slug, site.ID, false ];
	const affectedStatuses = [ post.status, oldStatus ];
	let listStatuses, key, entry, list;

	for ( key in _cache ) {
		if ( !_cache.hasOwnProperty( key ) ) {
			continue;
		}
		entry = _cache[ key ];

		list = entry.list;

		if ( list.query.type !== post.type ) {
			continue;
		}

		if ( -1 === affectedSites.indexOf( list.query.siteID ) ) {
			continue;
		}

		listStatuses = list.query.status.split( ',' ); // some statuses are grouped

		if ( intersection( listStatuses, affectedStatuses ).length === 0 ) {
			continue;
		}

		entry.dirty = true;
	}
}

PostsListCache.dispatchToken = Dispatcher.register( function( payload ) {
	var action = payload.action,
		PostListStore = require( './post-list-store-factory' )();

	Dispatcher.waitFor( [ PostListStore.dispatchToken ] );

	switch ( action.type ) {
		case 'FETCH_NEXT_POSTS_PAGE':
			set( PostListStore.get() );
			break;
		case 'RECEIVE_POSTS_PAGE':
			set( PostListStore.get() );
			break;

		case 'RECEIVE_UPDATED_POSTS':
			set( PostListStore.get() );
			break;

		case 'RECEIVE_UPDATED_POST':
		case 'RECEIVE_POST_BEING_EDITED':
			if ( action.post ) {
				markDirty( action.post, action.original ? action.original.status : null );
				set( PostListStore.get() );
			}
			break;
	}
} );

export function getCacheKey( options ) {
	let cacheKey = '';
	const keys = Object.keys( options ).sort();

	keys.forEach( function( key ) {
		if ( cacheKey.length ) {
			cacheKey += ':';
		}

		cacheKey += key + '-' + options[ key ];
	} );

	return cacheKey;
}

export function setCanonicalList( listKey, requestKey, list ) {
	debug( 'setCanonicalList %o %o (%o)', listKey, requestKey, list );
	_canonicalCache[ listKey ] = _canonicalCache[ listKey ] || {};
	_canonicalCache[ listKey ][ requestKey ] = list;
}

export function getCanonicalList( listKey, requestKey ) {
	debug( 'getCanonicalList %o %o', listKey, requestKey );
	const stream = _canonicalCache[ listKey ];
	if ( ! stream || typeof stream !== 'object' ) {
		return false;
	}
	const keys = Object.keys( stream );
	if ( keys[0] !== requestKey ) {
		// requests processing out of order, clear cache
		delete _cache[ listKey ];
		delete _canonicalCache[ listKey ];
		return false;
	}
	return stream[ requestKey ];
}

export function deleteCanonicalList( listKey, requestKey ) {
	debug( 'deleteCanonicalList %o %o', listKey, requestKey );
	const stream = _canonicalCache[ listKey ];
	if ( stream && stream[ requestKey ] ) {
		delete stream[ requestKey ];
	}
}

export default PostsListCache;
