/**
 * External dependencies
 */
import { expect } from 'chai';
import sinon from 'sinon';

/**
 * Internal dependencies
 */
import { SET_TITLE, SET_COUNT } from 'state/action-types';
import { setTitle, setCount } from '../actions';

describe('actions', () => {
	const spy = sinon.spy();

	beforeEach(() => spy.reset());

	describe('setTitle()', function() {
		it('should return an action object with a title and empty options', function() {
			setTitle('new title')(spy);

			expect(spy).to.have.been.calledWith({
				type: SET_TITLE,
				title: 'new title',
				options: {},
			});
		});
	});

	describe('setCount()', function() {
		it('should return action object with a count', function() {
			setCount(12)(spy);

			expect(spy).to.have.been.calledWith({
				type: SET_COUNT,
				count: 12,
			});
		});
	});
} );
