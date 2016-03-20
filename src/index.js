var START_POSITION = {
	x: 400,
	y: 600
};

var DIMENTIONS = {
	width: 3,
	height: 3
};

var PARTICLE_PATH_MIN = 1.6;
var PARTICLE_PATH_MAX = -1.6;
var PARTICLE_PATH_DISTANCE = 0.1;
var PARTICLE_LIMIT = 70;

var CLEAR_OPACITY = 0;

// FireworksCanvas
// =========================
function FireworksCanvas(options) {
	this.canvas = document.querySelector(options.id);

	this.context = this.canvas.getContext('2d');
	this.context.fillStyle = 'rgb(0,0,0)';

	this.options = options;
}

FireworksCanvas.prototype = {
	init: function() {
		this.particlePathLimit = PARTICLE_LIMIT;

		this.gravity = 0.05;

		this.addParticple();
	},

	requestFrame: function(callback) {
		window.requestAnimationFrame(callback);
	},

	setNewColor: function() {
		this.context.fillStyle = [
			'rgb(',
				(Math.floor(Math.random() * 256)), ',',
				(Math.floor(Math.random() * 256)), ',',
				(Math.floor(Math.random() * 256)),
			')'
		].join('');
	},

	addParticple: function() {
		var velocityX = PARTICLE_PATH_MIN;

		while (velocityX >= PARTICLE_PATH_MAX) {
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

			// Animate particle
			this.requestFrame(this.animate.bind(this, particle));

			// Set new velocityX
			velocityX = velocityX - PARTICLE_PATH_DISTANCE;
		}

		if (this.particlePathLimit > 0) {
			this.particlePathLimit = this.particlePathLimit - 1;
			this.requestFrame(this.addParticple.bind(this));
		}
	},

	getNewVelocity: function(velocity) {
		velocity.y = velocity.y - this.gravity;

		return {
			x: velocity.x,
			y: velocity.y
		};
	},

	getNewPosition: function(position, velocity) {
		return {
			x: position.x + velocity.x,
			y: position.y - velocity.y
		};
	},

	animate: function(particle) {
		var position = particle.getPosition();
		var velocity = particle.getVelocity();
		var newPosition;

		// Get new velocity and save them
		velocity = this.getNewVelocity(velocity);
		particle.setVelocity(velocity.x, velocity.y);

		// Get new position
		newPosition = this.getNewPosition(position, velocity);

		// Clear canvas
		this.clearPrevious(position.x, position.y);

		// Set new position
		particle.setPosition(newPosition.x, newPosition.y);

		// New random color
		this.setNewColor();

		// Draw new particle position
		this.drawNext(newPosition.x, newPosition.y);

		if (newPosition.y < START_POSITION.y) {
			this.requestFrame(this.animate.bind(this, particle));
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
	},

	setVelocity: function(x, y) {
		this.velocity = {
			x: x,
			y: y
		};
	}
};
