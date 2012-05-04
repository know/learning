define('app/game', ['app/map', 'app/renderer', 'app/pathfinder', '../../shared/js/gametypes'], function (Map, Renderer, Pathfinder) {

	return new Class({

		initialize: function (app) {

			this.app = app

			console.log('INIT GAME', this)
		},

		setup: function (canvas, background, foreground) {

			this.setRenderer(new Renderer(this, canvas, background, foreground))

			console.log(this)

		},

		setRenderer: function (renderer) {

			this.renderer = renderer

		},

		loadMap: function() {
			var self = this
	
			this.map = new Map(!this.renderer.upscaledRendering, this)
	
			this.map.ready(function() {
				console.log("Map loaded.")
				var tilesetIndex = self.renderer.upscaledRendering ? 0 : self.renderer.scale - 1
				self.renderer.setTileset(self.map.tilesets[tilesetIndex])
			})
		},

		loadSprites: function() {
			console.log("Loading sprites...");
			this.spritesets = [];
			this.spritesets[0] = {};
			this.spritesets[1] = {};
			this.spritesets[2] = {};
			_.map(this.spriteNames, this.loadSprite, this);
		},        

		run: function (started_callback) {

			var self = this

			this.loadSprites()
			//this.camera = this.render.camera


			var wait = setInterval(function() {
				//if(self.map.isLoaded && self.spritesLoaded()) {
					self.ready = true;
					//log.debug('All sprites loaded.');
							
					/*
					self.loadAudio();
					
					self.initMusicAreas();
					self.initAchievements();
					self.initCursors();
					self.initAnimations();
					self.initShadows();
					self.initHurtSprites();
				
					if(!self.renderer.mobile
					&& !self.renderer.tablet 
					&& self.renderer.upscaledRendering) {
						self.initSilhouettes();
					}
					*/
					self.initEntityGrid();
					self.initItemGrid();
					self.initPathingGrid();
					self.initRenderingGrid();
				
					self.setPathfinder(new Pathfinder(self.map.width, self.map.height));
			
					/*
					self.initPlayer();
					self.setCursor("hand");
					
					self.connect(started_callback);

					*/
					self.tick()
					started_callback
				
					clearInterval(wait)

                   
				//}
			}, 100);


		},

		tick: function () {
			if(this.started) {
				//this.updateCursorLogic()
				this.updater.update()
				this.renderer.renderFrame()
			}
			if(!this.isStopped) {
				this.started = true
				requestAnimFrame(this.tick.bind(this))
			} 
		},

		updateCursorLogic: function () {

		},

		setPathfinder: function(pathfinder) {
			this.pathfinder = pathfinder;
		},

		initEntityGrid: function() {
			this.entityGrid = [];
			for(var i=0; i < this.map.height; i += 1) {
				this.entityGrid[i] = [];
				for(var j=0; j < this.map.width; j += 1) {
					this.entityGrid[i][j] = {};
				}
			}
		   console.log("Initialized the entity grid.");
		},

		initItemGrid: function() {
			this.itemGrid = [];
			for(var i=0; i < this.map.height; i += 1) {
				this.itemGrid[i] = [];
				for(var j=0; j < this.map.width; j += 1) {
					this.itemGrid[i][j] = {};
				}
			}
			console.log("Initialized the item grid.");
		},

		initPathingGrid: function() {
			this.pathingGrid = [];
			for(var i=0; i < this.map.height; i += 1) {
				this.pathingGrid[i] = [];
				for(var j=0; j < this.map.width; j += 1) {
					this.pathingGrid[i][j] = this.map.grid[i][j];
				}
			}
			console.log("Initialized the pathing grid with static colliding cells.");
		},
	
		initRenderingGrid: function() {
			this.renderingGrid = [];
			for(var i=0; i < this.map.height; i += 1) {
				this.renderingGrid[i] = [];
				for(var j=0; j < this.map.width; j += 1) {
					this.renderingGrid[i][j] = {};
				}
			}
			console.log("Initialized the rendering grid.");
		}                   
		
	})
})