const config = {
	type: Phaser.WEBGL,
	scale: {
		parent: 'game-container',
		width: 640,
		height: 360,
	},
	render: {
		pixelArt: true,
	},
	plugins: {
		global: [
			{
				key: "PasuunaPlayerPlugin",
				plugin: Pasuuna.PasuunaPlugin,
				start: true,
				mapping: "pasuuna"
			}
		],
	},
	scene: {
		preload: preload,
		create: create,
		update: update,
	}
};

const game = new Phaser.Game(config);

function preload() {
	const progress = this.add.graphics();

	this.load.on("progress", value => {
		console.log('progress', value);
		progress.clear();
		progress.fillStyle(0xffffff, 1);
		progress.fillRect(
			0,
			this.game.scale.gameSize.height / 2 - 15,
			this.game.scale.gameSize.width * value,
			30
		);
	});

	this.load.on("complete", () => {
		progress.destroy();
	});

	this.load.binary('deadlock', 'https://api.modarchive.org/downloads.php?moduleid=35280#DEADLOCK.XM');
	this.load.audio('explode', ['explode.wav']);
	this.load.audio('ping', ['ping.wav']);
}

function create() {
	this.sound.pauseOnBlur = false;

	// Debugging all events into the console
	for (const key in this.pasuuna.eventTypes) {
		if (this.pasuuna.eventTypes.hasOwnProperty(key)) {
			this.pasuuna.events.on(this.pasuuna.eventTypes[key], (data) => {
				console.log(`Pasuuna:${key}`, data);
			});
		}
	}

	const songText = this.add.text(20, 15, 'No song loaded...');
	const playText = this.add.text(20, 35, 'play song')
	.setOrigin(0)
	.setInteractive({cursor: 'pointer'})
	.on('pointerdown', () => {
		if (this.pasuuna.isPlaying) {
			playText.setText('play song');
			this.pasuuna.stop();
		} else {
			playText.setText('stop song');
			this.pasuuna.play();
		}
	});

	this.add.text(20, 60, 'pasuuna vol 0.25')
	.setOrigin(0)
	.setInteractive({cursor: 'pointer'})
	.on('pointerdown', () => {
		this.pasuuna.setVolume(0.25);
	});
	this.add.text(20, 75, 'pasuuna vol 0.5')
	.setOrigin(0)
	.setInteractive({cursor: 'pointer'})
	.on('pointerdown', () => {
		this.pasuuna.setVolume(0.5);
	});
	this.add.text(20, 90, 'pasuuna vol 0.75')
	.setOrigin(0)
	.setInteractive({cursor: 'pointer'})
	.on('pointerdown', () => {
		this.pasuuna.setVolume(0.75);
	});
	this.add.text(20, 105, 'pasuuna vol 1')
	.setOrigin(0)
	.setInteractive({cursor: 'pointer'})
	.on('pointerdown', () => {
		this.pasuuna.setVolume(1);
	});


	// global sounds

	this.add.text(620, 35, 'play ping')
	.setOrigin(1, 0)
	.setInteractive({cursor: 'pointer'})
	.on('pointerdown', () => {
		this.sound.play('ping');
	});

	this.add.text(620, 55, 'play explode')
	.setOrigin(1, 0)
	.setInteractive({cursor: 'pointer'})
	.on('pointerdown', () => {
		this.sound.play('explode');
	});

	this.add.text(620, 100, 'global vol 0.25')
	.setOrigin(1, 0)
	.setInteractive({cursor: 'pointer'})
	.on('pointerdown', () => {
		this.sound.volume = 0.25;
	});
	this.add.text(620, 115, 'global vol 0.5')
	.setOrigin(1, 0)
	.setInteractive({cursor: 'pointer'})
	.on('pointerdown', () => {
		this.sound.volume = 0.5;
	});
	this.add.text(620, 130, 'global vol 0.75')
	.setOrigin(1, 0)
	.setInteractive({cursor: 'pointer'})
	.on('pointerdown', () => {
		this.sound.volume = 0.75;
	});
	this.add.text(620, 145, 'global vol 1')
	.setOrigin(1, 0)
	.setInteractive({cursor: 'pointer'})
	.on('pointerdown', () => {
		this.sound.volume = 1;
	});

	// instruments
	const instrumentGroup = this.add.group();

	this.pasuuna.events.on(this.pasuuna.eventTypes.songLoaded, (song) => {
		songText.setText(`Song title: ${song.title.trim()}`);

		let xBase = 30;
		let yBase = 120;

		song.instruments.forEach( (instrument, index) => {
			index = index - 1;

			if (index % 8 === 0) { yBase += 50; }

			const ellipse = this.add.ellipse(xBase + (index % 8) * 50, yBase, 40, 30, 0xff0000);
			ellipse.data = instrument.instrumentIndex;
			ellipse.alpha = 0.33;
			instrumentGroup.add(ellipse);
		});

	});

	this.pasuuna.events.on(this.pasuuna.eventTypes.samplePlay, (sample) => {
		const idx = sample.instrumentIndex;
		instrumentGroup.getChildren().filter( (ellipse) => {
			return ellipse.data === idx;
		}).forEach( (ellipse) => {
			ellipse.alpha = 1;
			this.tweens.killTweensOf(ellipse);
			this.tweens.add({
				targets: ellipse,
				alpha: 0.33,
				duration: 500
			});
		});
	});

	this.pasuuna.loadSongFromCache('deadlock', false);
}

function update(time, delta) {

}