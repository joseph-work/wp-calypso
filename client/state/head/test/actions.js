/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	HEAD_LINK_ADD,
	HEAD_META_ADD,
	HEAD_TITLE_SET,
	HEAD_UNREAD_COUNT_SET
} from 'state/action-types';

import {
	setTitle,
	setDescription,
	addLink,
	addMeta,
	setUnreadCount
} from '../actions';

describe( 'actions', () => {
	describe( '#setTitle()', () => {
		it( 'should return an action object', () => {
			const action = setTitle( 'Home' );

			expect( action ).to.eql( {
				type: HEAD_TITLE_SET,
				title: 'Home'
			} );
		} );
	} );

	describe( '#setDescription()', () => {
		it( 'should return an action object', () => {
			const action = setDescription( 'Lorem ipsum dolor sit amet.' );

			expect( action ).to.eql( {
				type: HEAD_META_ADD,
				meta: {
					name: 'description',
					content: 'Lorem ipsum dolor sit amet.'
				}
			} );
		} );
	} );

	describe( '#setUnreadCount()', () => {
		it( 'should return an action object', () => {
			const action = setUnreadCount( 123 );

			expect( action ).to.eql( {
				type: HEAD_UNREAD_COUNT_SET,
				count: 123
			} );
		} );
	} );

	describe( '#addLink()', () => {
		it( 'should return an action object', () => {
			const action = addLink( { rel: 'some-rel', content: 'some-content' } );

			expect( action ).to.eql( {
				type: HEAD_LINK_ADD,
				link: { rel: 'some-rel', content: 'some-content' }
			} );
		} );
	} );

	describe( '#addMeta()', () => {
		it( 'should return an action object', () => {
			const action = addMeta( { rel: 'some-rel', content: 'some-content' } );

			expect( action ).to.eql( {
				type: HEAD_META_ADD,
				meta: { rel: 'some-rel', content: 'some-content' }
			} );
		} );
	} );
} );
