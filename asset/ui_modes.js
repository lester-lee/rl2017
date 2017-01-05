Game.UIMode = {};
Game.UIMode.DEFAULT_COLOR_FG = '#fff';
Game.UIMode.DEFAULT_COLOR_BG = '#000';
var fg = Game.UIMode.DEFAULT_COLOR_FG;
var bg = Game.UIMode.DEFAULT_COLOR_BG;

Game.UIMode.gameStart = {
  enter: function(){
    // console.log("gamestart enter");
    Game.Message.send('from forth the fatal loins of these two foes...');
  },
  exit: function(){
    // console.log("gamestart exit");
  },
  render: function(display){
    // console.log("gamestart render");
    display.drawText(2,2,"It's a game!",fg,bg);
    display.drawText(2,3,"Press any key to continue.");
  },
  handleInput: function(inputType,inputData){
    // console.log("gamestart input");
    // ignore modding keys
    if (inputData.charCode !== 0){
      Game.switchUIMode(Game.UIMode.gamePersistence);
    }
  }
};

Game.UIMode.gamePlay = {
  enter: function(){
    // console.log("gamePlay enter");
    Game.Message.send('a pair of star-crossed lovers take their life');
  },
  exit: function(){
    // console.log("gamePlay exit");
  },
  render: function(display){
    // console.log("gamePlay render");
    display.drawText(1,1,"the following two sentences are false",fg,bg);
    display.drawText(1,3,"press [W] to win",fg,bg);
    display.drawText(1,4,"press [L] to lose",fg,bg);
    display.drawText(1,5,"press [=] to save/load/new");
  },
  handleInput: function(inputType,inputData){
    // console.log("gamePlay input");
    switch(inputData.keyCode){
      case ROT.VK_L:
        if(inputData.shiftKey){
          Game.switchUIMode(Game.UIMode.gameLose);
        }
        break;
      case ROT.VK_W:
        if(inputData.shiftKey){
          Game.switchUIMode(Game.UIMode.gameWin);
        }
        break;
      case ROT.VK_EQUALS:
        Game.switchUIMode(Game.UIMode.gamePersistence);
        break;
      default:
        break;
    }
  }
};

Game.UIMode.gameWin = {
  enter: function(){
    // console.log("gameWin enter");
    Game.Message.send('and Shelley sold seashells by the seashore');
  },
  exit: function(){
    // console.log("gameWin exit");
  },
  render: function(display){
    // console.log("gameWin render");
    display.drawText(1,2,"yer a winner",fg,bg);
    display.drawText(1,3,"press [ESC] to play again",fg,bg);
  },
  handleInput: function(inputType,inputData){
    // console.log("gameWin input");
    if (inputData.keyCode == ROT.VK_ESCAPE){
      Game.switchUIMode(Game.UIMode.gameStart);
    }
  }
};

Game.UIMode.gameLose = {
  enter: function(){
    // console.log("gameLose enter");
    Game.Message.send('HP: deaded');
  },
  exit: function(){
    // console.log("gameLose exit");
  },
  render: function(display){
    // console.log("gameLose render");
    display.drawText(1,2,"ya lost boi",fg,bg);
    display.drawText(1,3,"press [ESC] to play again",fg,bg);
  },
  handleInput: function(inputType,inputData){
    // console.log("gameLose input");
    if (inputData.keyCode == ROT.VK_ESCAPE){
      Game.switchUIMode(Game.UIMode.gameStart);
    }
  }
};

Game.UIMode.gamePersistence = {
  enter: function(){
    // console.log("gamePersistence enter");
    Game.Message.send('save, restore, or start a new game');
  },
  exit: function(){
    // console.log("gamePersistence exit");
  },
  render: function(display){
    // console.log("gamePersistence render");
    display.drawText(1,2,"S to save, L to load, N for new game",fg,bg);
  },
  handleInput: function(inputType,inputData){
    // console.log("gamePersistence input");
    if (inputType == 'keypress' && inputData.shiftKey){
      switch (inputData.keyCode){
        case (ROT.VK_S):
          this.saveGame();
          break;
        case (ROT.VK_L):
          this.loadGame();
          break;
        case (ROT.VK_N):
          this.newGame();
          break;
        default:
          break;
      }
    }
  },
  saveGame: function(){
    if (this.localStorageAvailable()){
      window.localStorage.setItem(Game.PERSISTENCE_NAMESPACE, JSON.stringify(Game));
      Game.switchUIMode(Game.UIMode.gamePlay);
    }
    Game.switchUIMode(Game.UIMode.gamePlay);
  },
  loadGame: function(){
    var json_state_data = window.localStorage.getItem(Game.PERSISTENCE_NAMESPACE);
    var state_data = JSON.parse(json_state_data);
    // console.dir(state_data);
    Game.setRandomSeed(state_data._randomSeed);
    Game.switchUIMode(Game.UIMode.gamePlay);
  },
  newGame: function(){
    Game.setRandomSeed(5 + Math.floor(ROT.RNG.getUniform()*100000));
    Game.switchUIMode(Game.UIMode.gamePlay);
  },
  localStorageAvailable: function () { // NOTE: see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  	try {
  		var x = '__storage_test__';
  		window.localStorage.setItem(x, x);
  		window.localStorage.removeItem(x);
  		return true;
  	}
  	catch(e) {
      Game.Message.send('Sorry, no local data storage is available for this browser');
  		return false;
  	}
  }
};
