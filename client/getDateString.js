const getNewDate = (curDate = '', direction = 'previous') => {
	let date;
	if (!curDate) {
		date = new Date();
		// make sure time is set to be zero;
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
	} else {
		date = new Date(`${curDate}T00:00:00:00`);
	}
	// date is now the start of today
	// make day start of previous or next (convert to unix milliseconds and add/subtract # of seconds in day)
	if (direction === 'previous') {
		date.setTime(date.getTime() - 86400000);
	} else {
		date.setTime(date.getTime() + 86400000);
	}
	// return formatted date string
	console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export default getNewDate;
