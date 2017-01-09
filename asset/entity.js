Game.Entity = function(template){
  template = template || {};
  Game.Symbol.call(this, template);
  if (!('attr' in this)) { this.attr = {}; }
  this.attr._name = template.name || '';
  this.attr._x = template.x || 0;
  this.attr._y = template.y || 0;
  this.attr._dispX = 0;
  this.attr._dispY = 0;

  this._entityID = Game.util.randomString(16);
  Game.ALL_ENTITIES[this._entityID] = this;

  // mixin/traits
  this._traitTracker = {};
  if (template.hasOwnProperty('traits')){
    for (var i=0; i < template.traits.length; i++){
      var trait = template.traits[i];
      this._traitTracker[trait.META.traitName] = true;
      this._traitTracker[trait.META.traitGroup] = true;
      for (var traitProp in traitProp != 'META' && trait){
        this[traitProp] = trait[traitProp];
      }
    }
    if (trait.META.hasOwnProperty('init')){
      trait.META.init.call(this,template);
    }
  }
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
