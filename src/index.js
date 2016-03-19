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
	this.context.fillStyle = 'rgb(0,0,0)';

	this.options = options;

	this.init();
}

FireworksCanvas.prototype = {
	init: function() {
		this.limitCounter = 0;

		window.requestAnimationFrame(this.addParticple.bind(this));
	},

	addParticple: function() {
		var velocityX = 3;

		while(velocityX >= -3) {
			var particle = new Particle({
					position: {
						x: START_POSITION.x,
						y: START_POSITION.y
					},
					velocity: {
						x: velocityX,
						y: 6
					}
				});

			window.requestAnimationFrame(this.animate.bind(this, particle));

			// Set new velocityX
			velocityX = velocityX - 0.25;
		}

		if (this.limitCounter < 300) {
			this.limitCounter = this.limitCounter + 1;
			window.requestAnimationFrame(this.addParticple.bind(this));
		}
	},

	animate: function(particle) {
		var position = particle.getPosition();
		var velocity = particle.getVelocity();

		var newPositionX = position.x - velocity.x;
		var newPositionY = position.y - velocity.y;

		// Clear canvas
		this.clearPrevious(position.x, position.y);

		// Set new position
		particle.setPosition(newPositionX, newPositionY);

		// Draw new dot
		this.drawNext(newPositionX, newPositionY);

		if (newPositionY > -3) {
			window.requestAnimationFrame(this.animate.bind(this, particle, velocity));
		}
	},

	drawNext: function(x, y) {
		this.context.fillRect(x, y, DIMENTIONS.width, DIMENTIONS.height);
	},

	clearPrevious: function(x, y) {
		this.context.clearRect(x - 1, y - 1, DIMENTIONS.width + 2, DIMENTIONS.height + 2);
	}
};

// Particle
// ===========================
function Particle(options) {
	this.position = {
		x: options.position ? options.position.x : START_POSITION.x,
		y: options.position ? options.position.y : START_POSITION.y
	};

	this.velocity = {
		x: options.velocity ? options.velocity.x : 0,
		y: options.velocity ? options.velocity.y : 2
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
	},

	getVelocity: function() {
		return this.velocity;
	}
};
