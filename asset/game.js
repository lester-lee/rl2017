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
      Game.getDisplay('messages').getContainer()
    );
  }
};

// var dm = new ROT.Map.DividedMaze(80,24);
// var display = new ROT.Display({width:80, height:24});

var Game = {
  _SPACING: 1.1,
  _display: {
    main: {
      w: 80,
      h: 24,
      o: null
    },
    messages: {
      w: 100,
      h: 6,
      o: null
    },
    avatar: {
      w: 20,
      h: 24,
      o: null
    }
  },

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
        spacing: Game._SPACING
      });
    }
    this.renderDisplayAll();
  },

  renderDisplayAll: function() {
    this.renderMain();
    this.renderAvatar();
    this.renderMessages();
  },

  getDisplay: function(displayID) {
    console.log(displayID);
    if (this._display.hasOwnProperty(displayID)){
      return this._display[displayID].o;
    }
    return null;
  },

  renderMain: function() {
    var d = this._display.main.o;
    d.drawText(5,5,"It's a Roguelike (eh)");
    d.drawText(40,20,"Press any key to continue.");
  },

  renderAvatar: function() {
    var d = this._display.avatar.o;
  },

  renderMessages: function() {
    var d = this._display.messages.o;
  }
};
