var START_POSITION = {
	x: 400,
	y: 600
};

var DIMENTIONS = {
	width: 3,
	height: 3
};

function FireworksCanvas(options) {
	this.canvas = document.querySelector(options.id);
	this.context = this.canvas.getContext('2d');

	this.options = options;

	this.init();
}

FireworksCanvas.prototype = {
	init: function() {
		var particle = new Particle();

		this.animate(particle);
	},

	animate: function(particle) {
		var position = particle.getPosition();
		var newPositionY = position.y - this.options.velocity;

		// Clear canvas
		this.clearPrevious(position.x, position.y);

		// Set new position
		particle.setPosition(START_POSITION.x, newPositionY);

		// Draw new dot
		this.drawNext(START_POSITION.x, newPositionY);

		if (newPositionY > 0) {
			window.requestAnimationFrame(this.animate.bind(this, particle));
		}
	},

	drawNext: function(x, y) {
		this.context.fillStyle = 'rgb(0,0,0)';
		this.context.fillRect(x, y, DIMENTIONS.width, DIMENTIONS.height);
	},

	clearPrevious: function(x, y) {
		this.context.clearRect(x, y, DIMENTIONS.width + 1, DIMENTIONS.height + 1);
	}
};

// Particle
// ===========================
function Particle() {
	this.position = {
		x: START_POSITION.x,
		y: START_POSITION.y
	};
}

Particle.prototype = {
	getPosition: function() {
		return this.position;
	},

	setPosition: function(x, y) {
		this.position = {
			x: x,
			y: y
		};
	}
};
