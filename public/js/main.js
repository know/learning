require(['app/app'], function (App) {

	var app, game

	var initApp = function() {

		var self = this

		window.addEvent('domready', function() {

			app = new App()
			initGame()

		})

	}

	var initGame = function () {

		var canvas = document.getElementById("entities"),
			background = document.getElementById("background"),
			foreground = document.getElementById("foreground")

		 require(['app/game'], function(Game) {

		 	game = new Game(app)
		 	game.setup(canvas, background, foreground)
		 	app.setGame(game)

		 	game.loadMap()

		 	app.startGame()


		 })
	}

	initApp()

})