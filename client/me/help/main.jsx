/**
 * External dependencies
 */
var React = require( 'react' ),
	PureRenderMixin = require( 'react-pure-render/mixin' );

/**
 * Internal dependencies
 */
var Main = require( 'components/main' ),
	HappinessEngineers = require( 'me/help/help-happiness-engineers' ),
	FormSectionHeading = require( 'components/forms/form-section-heading' ),
	MeSidebarNavigation = require( 'me/sidebar-navigation' ),
	HelpSearch = require( './help-search' ),
	ExternalLink = require( 'components/external-link' ),
	Card = require( 'components/card' ),
	CompactCard = require( 'components/card/compact' ),
	Button = require( 'components/button' );

module.exports = React.createClass( {
	displayName: 'Help',

	mixins: [ PureRenderMixin ],

	getSupportLinks: function() {
		return (
			<div className="help__support-links">
				<CompactCard className="help__support-link" href="https://support.wordpress.com/" target="__blank">
					<h2 className="help__support-link-title">{ this.translate( 'Support articles' ) }</h2>
					<p className="help__support-link-content">{ this.translate( 'Looking to learn more about a feature? Our docs have all the details.' ) }</p>
				</CompactCard>
				<CompactCard className="help__support-link" href="https://dailypost.wordpress.com/" target="__blank">
					<h2 className="help__support-link-title">{ this.translate( 'The Daily Post' ) }</h2>
					<p className="help__support-link-content">{ this.translate( 'Get daily tips for your blog and connect with others to share your journey.' ) }</p>
				</CompactCard>
				<CompactCard className="help__support-link" href="/help/contact/">
					<h2 className="help__support-link-title">{ this.translate( 'Contact us' ) }</h2>
					<p className="help__support-link-content">{ this.translate( 'Can\'t find the answer? Drop us a line and we\'ll lend a hand.' ) }</p>
					<Button compact primary>Contact Us</Button>
				</CompactCard>
		</div>
		);
	},

	render: function() {
		return (
			<Main className="help">
				<MeSidebarNavigation />
				<HelpSearch />
				{ this.getSupportLinks() }
				<HappinessEngineers />
			</Main>
		);
	}
} );
