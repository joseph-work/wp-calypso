/**
 * External dependencies
 */
import Dispatcher from 'dispatcher';

/**
 * Internal dependencies
 */
import { SET_TITLE, SET_COUNT } from 'state/action-types';

/**
 * Sets the new page title in the state.
 *
 * @param  {String}   title   New page title
 * @param  {Object}   options Options, i.e. `count` and `siteID`
 * @return {Function}         Action thunk
 */
export function setTitle(title, options = {}) {
	return (dispatch) => {
		dispatch({
			type: SET_TITLE,
			title,
			options
		});
	};
};

/**
 * Sets the count for the page title.
 *
 * @param  {Number}   count The count to display
 * @return {Function}       Action thunk
 */
export function setCount(count) {
	return (dispatch) => {
		dispatch({
			type: SET_COUNT,
			count
		});
	};
};
