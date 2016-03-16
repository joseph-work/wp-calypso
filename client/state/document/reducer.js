/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	SET_DOCUMENT_DESCRIPTION,
	SET_DOCUMENT_TITLE,
} from 'state/action-types';

const INITIAL_STATE = {
	title: '',
	description: '',
};

export function title( state = '', action ) {
	switch ( action.type ) {
		case SET_DOCUMENT_TITLE:
			return action.title;
	}

	return state;
}

export function description( state = '', action ) {
	switch ( action.type ) {
		case SET_DOCUMENT_DESCRIPTION:
			return action.description;
	}

	return state;
}

export function documentSettings( state = INITIAL_STATE, action ) {
	switch ( action.type ) {
		case SET_DOCUMENT_TITLE:
			return Object.assign( {}, state, { title: title( state.title, action ) } );

		case SET_DOCUMENT_DESCRIPTION:
			return Object.assign( {}, state, { description: description( state.description, action ) } );
	}

	return state;
}

combineReducers( {
	documentSettings
} );
