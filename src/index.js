var START_POSITION = {
	x: 400,
	y: 600
};

function FireworksCanvas(options) {
	this.canvas = document.querySelector(options.id);
	this.context = this.canvas.getContext('2d');

	this.options = options;

	this.context.fillStyle = 'rgb(0,0,0)';
	this.context.fillRect(START_POSITION.x, START_POSITION.y, 3, 3);

	this.animate();
}

FireworksCanvas.prototype = {
	animate: function() {
		new Particle({
			context: this.context,
			velocity: this.options.velocity,
			canvas: this.canvas
		});
	}
};

// Particle
// ===========================
function Particle(options) {
	this.y = START_POSITION.y;
	this.context = options.context;
	this.velocity  = options.velocity;
	this.canvas = options.canvas;

	this.startAnimation();
}

Particle.prototype = {
	startAnimation: function() {
		window.requestAnimationFrame(this.frame.bind(this));
	},

	frame: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.y = this.y - this.velocity;

		this.context.fillStyle = 'rgb(0,0,0)';
		this.context.fillRect(START_POSITION.x, this.y, 3, 3);

		if (this.y > 0) {
			window.requestAnimationFrame(this.frame.bind(this));
		}
	}
};
