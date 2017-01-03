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
    document.getElementById('wsrl-main-display').appendChild(
      Game.getDisplay('main').getContainer()
    );
  }
};

var Game = {
  display: {
    SPACING: 1.1,
    main: {
      w: 80,
      h: 24,
      o: null
    }
  },

  init: function() {
    console.log("game init");
    this.display.main.o = new ROT.Display(
      {width: this.display.main.w,
       height: this.display.main.h,
       spacing: Game.display.SPACING,});
    this.renderMain();
  },

  getDisplay: function(displayID) {
    if (this.display.hasOwnProperty(displayID)){
      return this.display[displayID].o;
    }
    return null;
  },

  renderMain: function() {
    var d = this.display.main.o;
    for (var i = 0; i < 10; i++) {
      d.drawText(5,i+5,"hello world");
    }
  }
};
