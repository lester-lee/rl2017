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
    // document.getElementById('wsrl-main-display').appendChild(
    //   display.getContainer()
    // );
    // dm.create(display.DEBUG);
  }
};

// var dm = new ROT.Map.DividedMaze(80,24);
// var display = new ROT.Display({width:80, height:24});

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

    // set up seed
    this._randomSeed = 5 + Math.floor(Math.random()*100000);
    console.log("using random seed "+this._randomSeed);
    ROT.RNG.setSeed(this._randomSeed);

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
    d.drawText(5,5,"It's a Roguelike (eh)");
    d.drawText(40,20,"Press any key to continue.");
  }
};
