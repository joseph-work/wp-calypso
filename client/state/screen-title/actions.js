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
 *
 */
export function setCount(count) {
	return (dispatch) => {
		dispatch({
			type: SET_COUNT,
			count
		});
	};
};
