/**
 * External dependencies
 */
import React from 'react';
import PureRenderMixin from 'react-pure-render/mixin';

/**
 * Internal dependencies
 */
import CompactCard from 'components/card/compact';
import Gridicon from 'components/gridicon';

module.exports = React.createClass( {
	displayName: 'HelpResult',

	mixins: [ PureRenderMixin ],

	onClick: function( event ) {
		if ( this.props.helpLink.disabled ) {
			event.preventDefault();
		}
	},

	getResultIcon: function() {
		const { iconTypeDescription = 'book' } = this.props;
		const iconClass = 'help-result__icon';
		const iconSize = 24;
		// By rule, gridicons don't contain logos so we need a special case here
		if ( iconTypeDescription === 'jetpack' ) {
			return (
				<svg className={ iconClass } height={ iconSize } width={ iconSize } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.39 12.335l-3.14-.8c-.798-.202-1.18-1.11-.77-1.822l3.91-6.773v9.395zm4.84-2.048l-3.91 6.773V9.665l3.14.8c.798.202 1.18 1.11.77 1.822z"/>
				</svg>
			);
		} else {
			return(
				<Gridicon className={ iconClass } icon={ iconTypeDescription } size={ iconSize } />
			);
		}
	},

	render: function() {
		return (
			<a className="help-result" href={ this.props.helpLink.link } target="__blank" onClick={ this.onClick }>
				<CompactCard className="help-result__wrapper">
					{ this.getResultIcon() }
					<h2 className="help-result__title">{ this.props.helpLink.title }</h2>
					<p className="help-result__description">{ this.props.helpLink.description }</p>
				</CompactCard>
			</a>
		);
	}
} );
