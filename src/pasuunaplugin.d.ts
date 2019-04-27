export declare class PasuunaPlugin extends Phaser.Plugins.BasePlugin {
    /**
     * Creates an instance of PasuunaPlugin.
     * @param {Phaser.Plugins.PluginManager} pluginManager - Phaser global plugin manager
     * @memberof PasuunaPlugin
     */
    constructor(pluginManager: any);
    /**
     * Get a file from binary cache with a key
     *
     * @param {string} key
     * @returns {boolean} song found or not (listen to songLoaded event for finish)
     * @memberof PasuunaPlugin
     */
    loadSongFromCache(key: any, autoPlay: any): boolean;
    /**
     * Play current loaded song, from currentPatternPosition, if set
     *
     * @memberof PasuunaPlugin
     */
    play(): void;
    /**
     * Stop playback
     *
     * @param {boolean} [resetVolume=false] - reset volume to 1
     * @memberof PasuunaPlugin
     */
    stop(resetVolume?: boolean): void;
    /**
     * Set the master volume for Pasuuna
     *
     * @param {number} [volume=0.95] - Float between 0..1 (Will be clamped)
     * @fires PasuunaEvents#masterVolumeChange
     * @memberof PasuunaPlugin
     */
    setVolume(volume?: number): void;
    /**
     * Get current play status of pasuuna
     *
     * @returns {boolean} whether the tracker is playing
     * @memberof PasuunaPlugin
     */
    readonly isPlaying: any;
    /**
     * Set current pattern index to play
     *
     * @param {number} index - Pattern index >= 0
     * @memberof PasuunaPlugin
     */
    setCurrentPattern(index: any): void;
}
