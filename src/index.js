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
function FireworksCanvas(selector) {
	this.defaults = {
		gravity: 0.13,
		newParticlesMax: 4,
		velocityX: 2.5,
		velocityYmax: 9
	};

	this.canvas = document.querySelector(selector);

	this.context = this.canvas.getContext('2d');
	this.context.fillStyle = '#fff';
}

FireworksCanvas.prototype = {
	init: function(options) {
		this.options = extend(this.defaults, options);

		this.particles = [];
		this.frame = this.frame.bind(this);
	},

	start: function() {
		this.running = true;
		this.frame();
	},

	stop: function() {
		this.running = false;
	},

	addParticles: function() {
		var amount = getRandomIntInclusive(1, this.options.newParticlesMax);

		while (amount > 0) {
			this.particles.push(this.getParticles());
			amount--;
		}
	},

	getParticles: function() {
		var vxMin = this.options.velocityX - (this.options.velocityX * 2);
		var vxMax = this.options.velocityX;
		var vyMax = this.options.velocityYmax;

		return {
			x: START_POSITION.x,
			y: START_POSITION.y,
			vX: getRandomArbitrary(vxMin, vxMax),
			vY: getRandomArbitrary(7, vyMax)
		};
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
	},

	frame: function() {
		if (this.running) {
			window.requestAnimationFrame(this.frame);
		}
		this.addParticles();
		this.render();
	},

	drawParticle: function(x, y, direction) {
		this.setRandomColor(x, y, direction);

		this.context.fillRect(x, y, DIMENTIONS.width, DIMENTIONS.height);
	},

	clearPrevious: function() {
		this.context.fillStyle = 'rgba(255,255,255,0.05)';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	},

	setRandomColor: function(x, y, direction) {
		var alpha = 1;

		// +0.15 to slow down the fadeOut effect
		if (direction === 'down') {
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
