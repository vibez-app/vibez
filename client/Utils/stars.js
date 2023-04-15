// Night Sky element

const $el = document.body;

// Generate a random number between min and max values

const genRandomNumber = (min, max) => Math.random() * (max - min) + min;

// Generate a star <div>

const genStar = () => {
	const star = document.createElement('div');
	star.classList.add('star');

	// Gen star coordinates relative to $el size
	const x = genRandomNumber(1, $el.offsetWidth);
	const y = genRandomNumber(1, $el.offsetHeight);

	const { style } = star;

	style.left = `${Math.floor(x)}px`;
	style.top = `${Math.floor(y)}px`;

	style.setProperty('--star-size', `${genRandomNumber(1, 3)}px`);

	style.setProperty(
		'--twinkle-duration',
		`${Math.ceil(genRandomNumber(1, 5))}s`
	);

	style.setProperty('--twinkle-delay', `${Math.ceil(genRandomNumber(1, 5))}s`);

	return star;
};

// eslint-disable-next-line no-plusplus
for (let index = 0; index < 500; index++) {
	$el.append(genStar());
}
