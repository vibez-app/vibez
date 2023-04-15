const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

const months = [
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

const formatDateString = (date) => {
	const dateObj = new Date(date);
	const year = dateObj.getFullYear();
	const month = months[dateObj.getMonth()];
	const dayNum = dateObj.getDate();
	const dayStr = days[dateObj.getDay()];
	return `${dayStr}, ${month} ${dayNum} ${year}`;
};

export default formatDateString;
