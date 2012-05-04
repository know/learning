define('app/app', ['storage'], function (Storage) {

	return new Class({

		initialize: function () {

			this.storage = new Storage()
			this.playButton = document.getElementById('play')

		},

		setGame: function (game) {

			this.game = game
			this.supportsWorkers = !!window.Worker
			this.ready = true

		},

		startGame: function () {
			//self.game.loadMap()
			this.start('username')
		},

		start: function (username) {

			this.game.run(function () {
				console.log('APP > start > this.game.run')
			})
		}
		
	})
})