# Phaser Plugin for Pasuuna Player

Phaser 3 plugin to use [Pasuuna Player](https://github.com/pinkkis/pasuuna-player) in your phaser projects. Plays SoundTracker, ProTracker and FastTracker mods.

MIT Licensed, see LICENSE.md for details. See Pasuuna Player repo for detail on the player itself.

## Usage

The plugin is a UMD module, exposed as Pasuuna.PasuunaPlugin on the window object. You can also import it in webpack or something instead.

See the example in the `/docs` folder for a quick example on how to use it.

* `#loadSongFromCache(key, autoplay)` - this takes a key string that is a Phaser cache key. Load mods as a binary in phaser's preloader, and pass the key to pasuuna. Start playback immediately if autoplay is true. Otherwise listen to the `songLoaded` event before calling `#play()`
* `#play()` - start song from beginning, or if you've set the current pattern index
* `#stop()` - stop the song
* `#setVolume(0.75)` - set Pasuuna volume, float between 0 - 1
* `#setCurrentPattern(index)` - set start point for playback with a pattern index integer.

## Events

Available events are under `this.pasuuna.eventTypes` as an object.

## Volume

Pasuuna shares Phaser's AudioContext, but volume controls are separate. So in your game, when controlling global volume, remember to change both implicitly.
