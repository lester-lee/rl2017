Game.Entity = function(template){
  template = template || {};
  Game.Symbol.call(this, template);
  if (!('attr' in this)) { this.attr = {}; }
  this.attr._name = template.name || '';
  this.attr._position = new Game.Coordinate(0,0);
  this.attr._dispPos = new Game.Coordinate(0,0);

  this._entityID = Game.Util.randomString(16);
  Game.ALL_ENTITIES[this._entityID] = this;

  // mixins/traits
  this._traitTracker = {};
  if (template.hasOwnProperty('traits')){
    for (var i=0; i < template.traits.length; i++){
      var trait = template.traits[i];
      this._traitTracker[trait.META.traitName] = true;
      this._traitTracker[trait.META.traitGroup] = true;
      for (var traitProp in traitProp != 'META' && trait){
        if (traitProp != 'META' && trait.hasOwnProperty(traitProp)){
          this[traitProp] = trait[traitProp];
        }
      }
      if (trait.META.hasOwnProperty('stateNamespace')) {
        this.attr[trait.META.stateNamespace] = {};
        for (var traitStateProp in trait.META.stateModel) {
          if (trait.META.stateModel.hasOwnProperty(traitStateProp)) {
            this.attr[trait.META.stateNamespace][traitStateProp] = trait.META.stateModel[traitStateProp];
          }
        }
      }
    }
    if (trait.META.hasOwnProperty('init')){
      trait.META.init.call(this,template);
    }
  }
};

Game.Entity.extend(Game.Symbol);

Game.Entity.prototype.hasTrait = function(check) {
  if (typeof check == 'object'){
    return this._traitTracker.hasOwnProperty(check.META.traitName);
  } else {
    return this._traitTracker.hasOwnProperty(check);
  }
}

Game.Entity.prototype.getName = function() {
    return this.attr._name;
};
Game.Entity.prototype.setName = function(name) {
    this.attr._name = name;
};
Game.Entity.prototype.setPos = function(pos){
    this.attr._position = pos;
};
Game.Entity.prototype.getPos = function(){
  return this.attr._position;
};
Game.Entity.prototype.setDispPos = function(pos){
  this.attr._dispPos = pos;
};
Game.Entity.prototype.getDispPos = function(){
  return this.attr._dispPos;
};
