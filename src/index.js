import {EVENT, Tracker} from '@pinkkis/pasuuna-player';

export class PasuunaPlugin extends Phaser.Plugins.BasePlugin {
	/**
	 * Creates an instance of PasuunaPlugin.
	 * @param {Phaser.Plugins.PluginManager} pluginManager - Phaser global plugin manager
	 * @memberof PasuunaPlugin
	 */
	constructor(pluginManager) {
		super(pluginManager);

		this.tracker = new Tracker(this.game.sound.context);
		this.events = this.tracker.events;
		this.eventTypes = EVENT;
		this.song = null;
		this.tracker.init();
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

		this.tracker.events.once(this.eventTypes.songLoaded, (song) => {
			this.song = song;

			if (autoPlay) {
				this.tracker.playSong();
			}
		});

		this.tracker.processFile(this.game.cache.binary.get(key));
		return true;
	}

	/**
	 * Play current loaded song, from currentPatternPosition, if set
	 *
	 * @memberof PasuunaPlugin
	 */
	play() {
		this.stop();
		this.tracker.playSong();
	}

	/**
	 * Stop playback
	 *
	 * @param {boolean} [resetVolume=false] - reset volume to 1
	 * @memberof PasuunaPlugin
	 */
	stop(resetVolume = false) {
		if (this.tracker.isPlaying) {
			this.tracker.stop(resetVolume);
		}
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

	/**
	 * Get current play status of pasuuna
	 *
	 * @returns {boolean} whether the tracker is playing
	 * @memberof PasuunaPlugin
	 */
	get isPlaying() {
		return this.tracker.isPlaying;
	}

	/**
	 * Set current pattern index to play
	 *
	 * @param {number} index - Pattern index >= 0
	 * @memberof PasuunaPlugin
	 */
	setCurrentPattern(index) {
		this.tracker.setCurrentPattern(index);
	}
}
