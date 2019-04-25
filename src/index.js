import {EVENT as PasuunaEvents, Tracker} from '@pinkkis/pasuuna-player';

export { PasuunaEvents };

export class PasuunaPlugin extends Phaser.Plugins.BasePlugin {

	/**
	 * Creates an instance of PasuunaPlugin.
	 * @param {Phaser.Plugins.PluginManager} pluginManager - Phaser global plugin manager
	 * @memberof PasuunaPlugin
	 */
	constructor(pluginManager) {
		super(pluginManager);

		this.tracker = new Tracker(this.game.sound.context);
		this.tracker.init();
		this.setupEvents();
	}

	setupEvents() {
		for (const key in PasuunaEvents) {
			if (PasuunaEvents.hasOwnProperty(key)) {
				this.tracker.events.on(PasuunaEvents[key], (data) => {
					console.log(`Pasuuna:${key}`, data);
				});
			}
		}
	}

	/**
	 * Get a file from binary cache with a key
	 *
	 * @param {string} key
	 * @returns {boolean} song found or not (listen to songLoaded event for finish)
	 * @memberof PasuunaPlugin
	 */
	loadSongFromCache(key, autoPlay) {
		if (!this.game.cache.binary.has(key)) {
			return false;
		}

		if (autoPlay) {
			this.tracker.events.once(PasuunaEvents.songLoaded, () => this.tracker.playSong());
		}

		this.tracker.processFile(this.game.cache.binary.get(key));
		return true;
	}

	/**
	 * Play song, optionally from a given position
	 *
	 * @param {number} songPosition - start playback from this position *NYI*
	 * @memberof PasuunaPlugin
	 */
	play(songPosition = this.tracker.getCurrentSongPosition()) {
		this.stop();
		this.tracker.playSong();
	}

	/**
	 * Stop playback
	 *
	 * @returns {number} The position where playback was stopped so you can continue from here
	 * @memberof PasuunaPlugin
	 */
	stop() {
		if (this.tracker.isPlaying) {
			const currentPosition = this.tracker.getCurrentSongPosition();
			this.tracker.stop();
			return currentPosition;
		}

		return 0;
	}

	/**
	 * Set the master volume for Pasuuna
	 *
	 * @param {number} [volume=0.95] - Float between 0..1 (Will be clamped)
	 * @fires PasuunaEvents#masterVolumeChange
	 * @memberof PasuunaPlugin
	 */
	setVolume(volume = 0.95) {
		this.tracker.audio.setMasterVolume( Phaser.Math.Clamp(volume, 0, 1) );
	}
}
