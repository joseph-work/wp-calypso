/**
 * External dependencies
 */
import React from 'react'
import classNames from 'classnames'
import Gridicon from 'components/gridicon'

export default React.createClass( {

	displayName: 'PluginIcon',

	propTypes: {
		image: React.PropTypes.string,
		isPlaceholder: React.PropTypes.bool
	},

	shouldComponentUpdate: function( nextProps ) {
		if ( this.props.isPlaceholder !== nextProps.isPlaceholder ) {
			return true;
		}
		if ( this.props.image !== nextProps.image ) {
			return true;
		}
		return false;
	},

	render() {
		const className = classNames( {
				'plugin-icon': true,
				'is-placeholder': this.props.isPlaceholder,
				'is-fallback': ! this.props.image
			} ),
		avatar = ( this.props.isPlaceholder || ! this.props.image ) ? <Gridicon icon="plugins" /> : <img className="plugin-icon__img" src={ this.props.image } />;

		return (
			<div className={ classNames( this.props.className, className ) } >
				{ avatar }
			</div>
		);
	}
} );
