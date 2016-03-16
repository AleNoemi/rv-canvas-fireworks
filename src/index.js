function FireworksCanvas(options) {
	this.canvas = document.querySelector(options.id);
	this.context = this.canvas.getContext('2d');

	console.log(this);
}