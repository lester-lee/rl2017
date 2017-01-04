Game.UIMode = {};
Game.UIMode.DEFAULT_COLOR_FG = '#fff';
Game.UIMode.DEFAULT_COLOR_BG = '#000';
var fg = Game.UIMode.DEFAULT_COLOR_FG;
var bg = Game.UIMode.DEFAULT_COLOR_BG;

Game.UIMode.gameStart = {
  enter: function(){
    console.log("gamestart enter");
    Game.Message.send('from forth the fatal loins of these two foes...');
  },
  exit: function(){
    console.log("gamestart exit");

  },
  render: function(display){
    console.log("gamestart render");
    display.drawText(2,2,"It's a game!",fg,bg);
    display.drawText(2,3,"Press any key to continue.");
  },
  handleInput: function(inputType,inputData){
    console.log("gamestart input");
    // ignore modding keys
    if (inputData.charCode !== 0){
      Game.switchUIMode(Game.UIMode.gamePlay);
    }
  }
};

Game.UIMode.gamePlay = {
  enter: function(){
    console.log("gamePlay enter");
    Game.Message.send('a pair of star-crossed lovers take their life');
  },
  exit: function(){
    console.log("gamePlay exit");
  },
  render: function(display){
    console.log("gamePlay render");
    display.drawText(1,1,"gamePlay mode",fg,bg);
    display.drawText(1,3,"press [W] to win",fg,bg);
    display.drawText(1,4,"press [L] to lose",fg,bg);
  },
  handleInput: function(inputType,inputData){
    console.log("gamePlay input");
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
      default:
        break;
    }
  }
};

Game.UIMode.gameWin = {
  enter: function(){
    console.log("gameWin enter");
    Game.Message.send('and Shelley sold seashells by the seashore');
  },
  exit: function(){
    console.log("gameWin exit");
  },
  render: function(display){
    console.log("gameWin render");
    display.drawText(1,2,"yer a winner",fg,bg);
  },
  handleInput: function(inputType,inputData){
    console.log("gameWin input");
    if (inputData.keyCode == ROT.VK_ESCAPE){
      Game.switchUIMode(Game.UIMode.gameStart);
    }
  }
};

Game.UIMode.gameLose = {
  enter: function(){
    console.log("gameLose enter");
    Game.Message.send('HP: deaded');
  },
  exit: function(){
    console.log("gameLose exit");
  },
  render: function(display){
    console.log("gameLose render");
    display.drawText(1,2,"ya lost boi",fg,bg);
  },
  handleInput: function(inputType,inputData){
    console.log("gameLose input");
    if (inputData.keyCode == ROT.VK_ESCAPE){
      Game.switchUIMode(Game.UIMode.gameStart);
    }
  }
};
