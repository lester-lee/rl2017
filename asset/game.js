console.log("game.js loaded");

window.onload = function() {
  console.log("window loaded");
  // Check if rot.js works on this browser
  if (!ROT.isSupported()){
    alert("The rot.js library isn't supported by your browser.");
  } else {
    // Initialize the game
    Game.init();
    // Add containers to HTML
    document.getElementById('wsrl-avatar-display').appendChild(
      Game.getDisplay('avatar').getContainer()
    );
    document.getElementById('wsrl-main-display').appendChild(
      Game.getDisplay('main').getContainer()
    );
    document.getElementById('wsrl-message-display').appendChild(
      Game.getDisplay('message').getContainer()
    );

    // Handle keyboard events
    var bindEventToScreen = function(eventType) {
      window.addEventListener(eventType, function(evt) {
          Game.eventHandler(eventType,evt);
      });
    };
    bindEventToScreen('keypress');
    bindEventToScreen('keydown');

    Game.switchUIMode(Game.UIMode.gameStart);
  }
};

// var dm = new ROT.Map.DividedMaze(80,24);
// var display = new ROT.Display({width:80, height:24});

var Game = {
  _randomSeed: 0,
  _SPACING: 1.1,
  _display: {
    main: {
      w: 60,
      h: 25,
      o: null
    },
    message: {
      w: 80,
      h: 6,
      o: null
    },
    avatar: {
      w: 20,
      h: 25,
      o: null
    }
  },

  _curUIMode: null,

  init: function() {
    console.log("game init");

    // set up seed
    this._randomSeed = 5 + Math.floor(Math.random()*100000);
    console.log("using random seed "+this._randomSeed);
    ROT.RNG.setSeed(this._randomSeed);

    // set up displays
    for (var display_key in this._display){
      this._display[display_key].o = new ROT.Display({
        width: this._display[display_key].w,
        height: this._display[display_key].h,
        spacing: Game._SPACING,
        //forceSquareRatio: true
      });
    }
    this.renderAll();
  },

  refresh: function() {
    this.renderAll();
  },

  setRandomSeed: function(s) {
    this._randomSeed = s;
    console.log("using random seed "+this._randomSeed);
    ROT.RNG.setSeed(this._randomSeed);
  },

  renderAll: function() {
    if (this._curUIMode){
      this.renderMain();
      this.renderAvatar();
      this.renderMessage();
    }
  },

  getDisplay: function(displayID) {
    if (this._display.hasOwnProperty(displayID)){
      return this._display[displayID].o;
    }
    return null;
  },

  renderMain: function() {
    this._display.main.o.clear();
    if (this._curUIMode && this._curUIMode.hasOwnProperty('render')){
      var d = this.getDisplay('main');
      this._curUIMode.render(d);
    }
  },

  renderAvatar: function() {
    this._display.avatar.o.clear();
    if (this._curUIMode && this._curUIMode.hasOwnProperty('renderAvatar')){
      var d = this.getDisplay('avatar');
      this._curUIMode.renderAvatar(d);
    }
  },

  renderMessage: function() {
    var d = this.getDisplay('message');
    Game.Message.render(d);
  },

  eventHandler: function (eventType, evt) {
    // When an event is received have the current ui handle it
    if (this._curUIMode) {
        this._curUIMode.handleInput(eventType, evt);
        Game.refresh();
    }
  },

  switchUIMode: function(newMode) {
    if (this._curUIMode){
      this._curUIMode.exit();
    }
    this._curUIMode = newMode;
    if (this._curUIMode){
      this._curUIMode.enter();
    }
    this.renderAll();
  }
};
