/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import SingleSiteComponent from 'my-sites/themes/single-site';
import MultiSiteComponent from 'my-sites/themes/multi-site';
import LoggedOutComponent from 'my-sites/themes/logged-out';
import i18n from 'lib/mixins/i18n';
import trackScrollPage from 'lib/track-scroll-page';
import buildTitle from 'lib/screen-title/utils';
import { getAnalyticsData } from '../helpers';
import { setSection } from 'state/ui/actions';
import { makeElement, runClientAnalytics, LoggedOutHead } from './index.node.js';
import DefaultHead from 'layout/head';

/**
 * Re-export
 */
export { details } from './index.node.js';

function getMultiSiteProps( context ) {
	const { tier, site_id: siteId } = context.params;

	const { basePath, analyticsPageTitle } = getAnalyticsData(
		context.path,
		tier,
		siteId
	);

	const boundTrackScrollPage = function() {
		trackScrollPage(
			basePath,
			analyticsPageTitle,
			'Themes'
		);
	};

	return {
		tier,
		search: context.query.s,
		trackScrollPage: boundTrackScrollPage
	};
};

function getSingleSiteProps( context ) {
	const { site_id: siteId } = context.params;

	const props = getMultiSiteProps( context );

	props.key = siteId;
	props.siteId = siteId;

	return props;
}

const LoggedInHead = ( { children, context: { params: { tier, site_id: siteID } } } ) => (
	<DefaultHead
		title={ buildTitle(
			i18n.translate( 'Themes', { textOnly: true } ),
			{ siteID }
		) }
		tier={ tier || 'all' }>
		{ children }
	</DefaultHead>
);

const setLoggedInDesignSection = setSection( 'design', {
	hasSidebar: true,
	isFullScreen: false
} );

const setLoggedOutDesignSection = setSection( 'design', {
	hasSidebar: false,
	isFullScreen: false
} );

export const singleSite = makeElement(
	SingleSiteComponent,
	getSingleSiteProps,
	LoggedInHead,
	setLoggedInDesignSection,
	runClientAnalytics
);

export const multiSite = makeElement(
	MultiSiteComponent,
	getMultiSiteProps,
	LoggedInHead,
	setLoggedInDesignSection,
	runClientAnalytics
);

export const loggedOut = makeElement(
	LoggedOutComponent,
	getMultiSiteProps,
	LoggedOutHead,
	setLoggedOutDesignSection,
	runClientAnalytics
);
