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

	this.gravity = 0.13;
	this.particles = [];

	this.context = this.canvas.getContext('2d');
	this.context.fillStyle = '#fff';
}

FireworksCanvas.prototype = {
	init: function() {
		this.addParticles();
	},

	addParticles: function() {
		var amount = this.getRandomIntInclusive(2, 4);

		this.particles = this.particles.concat(this.getParticles(amount));

		this.render();
	},

	getParticles: function(amount) {
		var newParticles = [];
		var max = amount;

		while (max > 0) {
			newParticles.push({
				x: START_POSITION.x,
				y: START_POSITION.y,
				vX: this.getRandomArbitrary(-2.5, 2.5),
				vY: this.getRandomIntInclusive(7, 9)
			});
			max--;
		}

		return newParticles;
	},

	render: function() {
		var self = this;
		var direction;

		// Clear previous state
		this.clearPrevious();

		// Loop through all particles
		this.particles = this.particles.filter(function(p) {
			// Aplly gravity
			p.vY = p.vY - self.gravity;

			// Update positions
			p.y = p.y - p.vY;
			p.x = p.x - p.vX;

			// Define direction
			direction = (p.vY < 0) ? 'down' : 'up';

			// Check if position is still on viewport
			if (p.y < START_POSITION.y + DIMENTIONS.height) {
				self.drawParticle(p.x, p.y, direction);
				return true;
			}

			return false;
		});

		window.requestAnimationFrame(function() {
			self.addParticles();
		});
	},

	drawParticle: function(x, y, direction) {
		this.setRandomColor(x, y, direction);

		this.context.fillRect(x, y, DIMENTIONS.width, DIMENTIONS.height);
	},

	clearPrevious: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	setRandomColor: function(x, y, direction) {
		var alpha = 1;

		if (direction === 'down') {
			alpha = (alpha - (y / START_POSITION.y)) + 0.15;
		}

		this.context.fillStyle = [
			'rgba(' +
				(Math.floor(Math.random() * 256)) + ',' +
				(Math.floor(Math.random() * 256)) + ',' +
				(Math.floor(Math.random() * 256)) + ',' +
				alpha +
			')'
		].join('');
	},

	getRandomArbitrary: function(min, max) {
		return (Math.random() * (max - min) + min).toFixed(1);
	},

	getRandomIntInclusive: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
};