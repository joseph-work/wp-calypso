/**
 * Internal dependencies
 */
import { setTitle as legacySetTitle } from './actions';

/**
 * Given a Redux store instance, subscribes to the store, updating the head
 * when the title state changes. Currently, this dispatches through the legacy
 * Flux actions used elsewhere in the codebase.
 *
 * @param {Object} store Redux store instance
 */
export function subscribeToStore( store ) {
	let title = store.getState().head.title;
	let count = store.getState().head.unreadCount;

	store.subscribe( () => {
		let nextTitle = store.getState().head.title;
		let nextCount = store.getState().head.unreadCount;

		if ( nextTitle !== title || nextCount !== count ) {
			title = nextTitle;
			count = nextCount;

			legacySetTitle( title, { count: count } );
		}
	} );
}
