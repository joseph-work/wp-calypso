/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	SET_DOCUMENT_TITLE,
	SET_DOCUMENT_DESCRIPTION,
} from 'state/action-types';

import {
	title,
	documentSettings,
	description
} from '../reducer';

describe( 'reducer', () => {
	describe( '#title()', () => {
		it( 'should default to an empty string', () => {
			const state = title( undefined, {} );

			expect( state ).to.eql( '' );
		} );

		it( 'should properly set a new title', () => {
			const newState = title( undefined, { type: SET_DOCUMENT_TITLE, title: 'new title'} );

			expect( newState ).to.eql( 'new title' );
		} );
	} );

	describe( '#description()', () => {
		it( 'should default to an empty string', () => {
			const state = description( undefined, {} );

			expect( state ).to.eql( '' );
		} );

		it( 'should properly set a new description', () => {
			const newState = description( undefined, { type: SET_DOCUMENT_DESCRIPTION, description: 'new description'} );

			expect( newState ).to.eql( 'new description' );
		} );
	} );

	describe( '#documentSettings()', () => {
		it( 'should default to an empty object', () => {
			const newState = documentSettings( undefined, {} );

			expect( newState ).to.eql( {
				title: '',
				description: ''
			} );
		} );

		it( 'should update the title', () => {
			const newState = documentSettings( undefined, { type: SET_DOCUMENT_TITLE, title: 'new title' } );
			expect( newState.title ).to.eql( 'new title' );
		} );

		it( 'should properly set a new description', () => {
			const newState = documentSettings( undefined, { type: SET_DOCUMENT_DESCRIPTION, description: 'new description'} );
			expect( newState.description ).to.eql( 'new description' );
		} );
	} );
} );
