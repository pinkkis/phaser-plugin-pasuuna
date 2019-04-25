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
		create: create
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
	this.load.binary('spacedeb', 'https://api.modarchive.org/downloads.php?moduleid=57925#space_debris.mod');
}

function create() {
	this.sound.pauseOnBlur = false;
	const text = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, 'Stuff', {
		color: '#fff',
		align: 'center'
	});
	text.setOrigin(0.5);
	text.setShadow(0, 1, "#888", 2);

	// const tracker = new PasuunaPlayer.Tracker(this.sound.context);
	// tracker.init();
	// tracker.processFile(this.cache.binary.get('mod'), 'spacedeb.mod');
	// tracker.playSong();
}