export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const oneSecond = 1000;
const oneMinute = oneSecond * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;
const oneWeek = oneDay * 7;

export const getDifferenceInSeconds = (d1: Date, d2: Date) => {
	return Math.abs(Math.round((d1.getTime() - d2.getTime()) / oneSecond));
};

export const getDifferenceInMinutes = (d1: Date, d2: Date) => {
	return Math.abs(Math.round((d1.getTime() - d2.getTime()) / oneMinute));
};

export const getDifferenceInHours = (d1: Date, d2: Date) => {
	return Math.abs(Math.round((d1.getTime() - d2.getTime()) / oneHour));
};

export const getDifferenceInDays = (d1: Date, d2: Date) => {
	return Math.abs(Math.round((d1.getTime() - d2.getTime()) / oneDay));
};

export const getDifferenceInWeeks = (d1: Date, d2: Date) => {
	return Math.abs(Math.round((d1.getTime() - d2.getTime()) / oneWeek));
};

export const getExactDate = (date: Date) => {
	return `${
		months[date.getMonth()]
	} ${date.getDate()}, ${date.getFullYear()}`;
};

export const getTimestamp = (date: Date) => {
	const exactDate = getExactDate(date);
	let timestamp = exactDate;
	const currentDate = new Date();
	const diffSeconds = getDifferenceInSeconds(currentDate, date);
	const diffMinutes = getDifferenceInMinutes(currentDate, date);
	const diffHours = getDifferenceInHours(currentDate, date);
	const diffDays = getDifferenceInDays(currentDate, date);
	const diffWeeks = getDifferenceInWeeks(currentDate, date);
	if (diffSeconds < 60) {
		if (diffSeconds > 1) {
			timestamp = `${diffSeconds} seconds ago`;
		} else {
			timestamp = `${diffSeconds} second ago`;
		}
	} else if (diffMinutes < 60) {
		if (diffMinutes > 1) {
			timestamp = `${diffMinutes} minutes ago`;
		} else {
			timestamp = `${diffMinutes} minute ago`;
		}
	} else if (diffHours < 24) {
		if (diffHours > 1) {
			timestamp = `${diffHours} hours ago`;
		} else {
			timestamp = `${diffHours} hour ago`;
		}
	} else if (diffDays < 7) {
		if (diffDays > 1) {
			timestamp = `${diffDays} days ago`;
		} else {
			timestamp = `${diffDays} day ago`;
		}
	} else if (diffWeeks < 4) {
		if (diffWeeks > 1) {
			timestamp = `${diffWeeks} weeks ago`;
		} else {
			timestamp = `${diffWeeks} week ago`;
		}
	}

	return timestamp;
};
