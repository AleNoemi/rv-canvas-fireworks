var START_POSITION = {
	x: 400,
	y: 600
};

var DIMENTIONS = {
	width: 3,
	height: 3
};

// FireworksCanvas
// =========================
function FireworksCanvas(options) {
	this.canvas = document.querySelector(options.id);

	this.gravity = 0.15;
	this.particles = [];

	this.context = this.canvas.getContext('2d');
	this.context.fillStyle = '#fff';
}

FireworksCanvas.prototype = {
	init: function() {
		this.particles = [];

		this.start();
	},

	start: function() {
		this.addParticles();
	},

	addParticles: function() {
		var max = 50;

		while (max > 0) {
			this.particles.push(this.getParticle());
			max--;
		}

		this.render();
	},

	getRandomArbitrary: function(min, max) {
		return (Math.random() * (max - min) + min).toFixed(1);
	},

	getRandomIntInclusive: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	getParticle: function() {
		return {
			x: START_POSITION.x,
			y: START_POSITION.y,
			vX: this.getRandomArbitrary(-1.7, 1.7),
			vY: this.getRandomIntInclusive(6, 12)
		};
	},

	render: function() {
		var self = this;

		// Clear previous state
		this.clearPrevious();

		// Loop through all particles
		this.particles = this.particles.reduce(function(particles, p) {
			// Aplly gravity
			p.vY = p.vY - self.gravity;

			// Update positions
			p.y = p.y - p.vY;
			p.x = p.x - p.vX;

			// Draw on canvas
			self.drawParticle(p.x, p.y);

			if (p.y < START_POSITION.y + DIMENTIONS.height) {
				particles.push(p);
			}

			return particles;
		}, []);

		window.requestAnimationFrame(function() {
			self.addParticles();
		});
	},


	setRandomColor: function() {
		this.context.fillStyle = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
	},

	drawParticle: function(x, y) {
		x = x.toFixed(1);
		y = parseInt(y, 10);

		this.setRandomColor();

		this.context.fillRect(x, y, DIMENTIONS.width, DIMENTIONS.height);
	},

	clearPrevious: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
};