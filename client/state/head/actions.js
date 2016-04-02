import {
	HEAD_LINK_ADD,
	HEAD_META_ADD,
	HEAD_TITLE_SET,
	HEAD_UNREAD_COUNT_SET
} from 'state/action-types';

export function setTitle( title ) {
	return {
		type: HEAD_TITLE_SET,
		title
	};
}

export function addLink( link ) {
	return {
		type: HEAD_LINK_ADD,
		link
	};
}

export function addMeta( meta ) {
	return {
		type: HEAD_META_ADD,
		meta
	};
}

export function setDescription( description ) {
	let meta = {
		name: 'description',
		content: description
	};

	return {
		type: HEAD_META_ADD,
		meta
	};
}

export function setUnreadCount( count ) {
	return {
		type: HEAD_UNREAD_COUNT_SET,
		count
	};
}
