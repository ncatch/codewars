function drawImage(query, image) {
	const canvas = document.querySelector(query);

	canvas.style.width = image.width * 10 + 'px';
	canvas.style.height = image.height * 10 + 'px';

	const ctx = canvas.getContext("2d");

	for (let x = 0; x < image.width; x++) {
		for (let y = 0; y < image.height; y++) {
			const color = image.getPixelByXY(x, y);

			ctx.fillStyle = `rgba(${color},${color},${color})`;
			ctx.fillRect(x * 10, y * 10, 10, 10);

			console.log(x,y,color)
		}
	}
}