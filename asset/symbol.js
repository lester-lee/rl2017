Game.Symbol = function(chr,fg,bg){
  this.attr = {
    _char: chr,
    _fg: fg || Game.UIMode.DEFAULT_FG,
    _bg: bg || Game.UIMode.DEFAULT_BG
  };
};

Game.Symbol.prototype.getChar = function(){
  return this.attr._char;
};

Game.Symbol.prototype.getFg = function(){
  return this.attr._fg;
};

Game.Symbol.prototype.getBg = function(){
  return this.attr._bg;
};
