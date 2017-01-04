Game.UIMode = {};
Game.UIMode.DEFAULT_COLOR_FG = '#fff';
Game.UIMode.DEFAULT_COLOR_BG = '#000';

Game.UIMode.gameStart = {
  enter: function(){
    console.log("gamestart enter");
  },
  exit: function(){
    console.log("gamestart exit");
  },
  render: function(display){
    console.log("gamestart render");
    display.drawText(1,2,"game start mode");
  },
  handleInput: function(inputType,inputData){
    console.log("gamestart input");
  }
};

Game.UIMode.gamePlay = {
  enter: function(){
    console.log("gamePlay enter");
  },
  exit: function(){
    console.log("gamePlay exit");
  },
  render: function(display){
    console.log("gamePlay render");
    display.drawText(1,2,"gamePlay mode");
  },
  handleInput: function(inputType,inputData){
    console.log("gamePlay input");
  }
};

Game.UIMode.gameWin = {
  enter: function(){
    console.log("gameWin enter");
  },
  exit: function(){
    console.log("gameWin exit");
  },
  render: function(display){
    console.log("gameWin render");
    display.drawText(1,2,"gameWin mode");
  },
  handleInput: function(inputType,inputData){
    console.log("gameWin input");
  }
};

Game.UIMode.gameLose = {
  enter: function(){
    console.log("gameLose enter");
  },
  exit: function(){
    console.log("gameLose exit");
  },
  render: function(display){
    console.log("gameLose render");
    display.drawText(1,2,"gameLose mode");
  },
  handleInput: function(inputType,inputData){
    console.log("gameLose input");
  }
};
