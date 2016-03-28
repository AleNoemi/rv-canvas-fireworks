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
function FireworksCanvas() {
	this.defaults = {
		gravity: 0.13,
		newParticlesMin: 2,
		newParticlesMax: 4,
		velocityXmin: -2.5,
		velocityXmax: 2.5,
		velocityYmin: 7,
		velocityYmax: 9
	};
}

FireworksCanvas.prototype = {
	init: function(options) {
		this.options = extend(this.defaults, options);

		this.canvas = document.querySelector(this.options.id);

		this.context = this.canvas.getContext('2d');
		this.context.fillStyle = '#fff';

		this.stopped = 0;
		this.particles = [];

		this.addParticles();
	},

	stop: function() {
		this.stopped = 1;
		this.clearPrevious();
	},

	addParticles: function() {
		if (this.stopped) {
			return;
		}

		var amount = getRandomIntInclusive(
				this.options.newParticlesMin,
				this.options.newParticlesMax
			);

		this.particles = this.particles.concat(this.getParticles(amount));

		this.render();
	},

	getParticles: function(amount) {
		var newParticles = [];
		var max = amount;
		var vxMin = this.options.velocityXmin;
		var vxMax = this.options.velocityXmax;
		var vyMin = this.options.velocityYmin;
		var vyMax = this.options.velocityYmax;

		while (max > 0) {
			newParticles.push({
				x: START_POSITION.x,
				y: START_POSITION.y,
				vX: getRandomArbitrary(vxMin, vxMax),
				vY: getRandomIntInclusive(vyMin, vyMax)
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
			p.vY = p.vY - self.options.gravity;
			// Define direction
			direction = (p.vY < 0) ? 'down' : 'up';

			// Update positions
			p.y = p.y - p.vY;
			p.x = p.x - p.vX;

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
			// +0.15 to slow down the fadeOut effect
			alpha = (alpha - (y / START_POSITION.y)) + 0.15;
		}

		this.context.fillStyle = [
			'rgba(',
				(Math.floor(Math.random() * 256)), ',',
				(Math.floor(Math.random() * 256)), ',',
				(Math.floor(Math.random() * 256)), ',',
				alpha,
			')'
		].join('');
	}
};

// Helper functions
// ======================
function getRandomArbitrary(min, max) {
	return (Math.random() * (max - min) + min).toFixed(1);
}

function getRandomIntInclusive(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function extend(a, b) {
	for (var key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
}
