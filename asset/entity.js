Game.Entity = function(properties){
  properties = properties || {};
  Game.Symbol.call(this, properties);
  if (!('attr' in this)) { this.attr = {}; }
  this.attr._name = properties.name || '';
  this.attr._x = properties.x || 0;
  this.attr._y = properties.y || 0;
  this.attr._dispX = 0;
  this.attr._dispY = 0;

  this._entityID = Game.util.randomString(16);
  Game.ALL_ENTITIES[this._entityID] = this;
};

Game.Entity.extend(Game.Symbol);

Game.Entity.prototype.getName = function() {
    return this.attr._name;
};
Game.Entity.prototype.setName = function(name) {
    this.attr._name = name;
};
Game.Entity.prototype.setPos = function(x, y){
    this.setX(x);
    this.setY(y);
};
Game.Entity.prototype.getX = function() {
    return this.attr._x;
};
Game.Entity.prototype.setX = function(x) {
    this.attr._x = x;
};
Game.Entity.prototype.setY = function(y) {
    this.attr._y = y;
};
Game.Entity.prototype.getY   = function() {
    return this.attr._y;
};

Game.Entity.prototype.getdispY   = function() {
    return this.attr._dispY;
};
Game.Entity.prototype.getdispX   = function() {
    return this.attr._dispX;
};
Game.Entity.prototype.setDisplayPos = function(x,y){
  this.attr._dispX = x;
  this.attr._dispY = y;
};
