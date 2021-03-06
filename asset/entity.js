Game.DATASTORE.ENTITY = {};

Game.Entity = function(template) {
    template = template || {};
    Game.Symbol.call(this, template);
    if (!('attr' in this)) {
        this.attr = {};
    }
    this.attr._name = template.name || '';
    this.attr._position = new Game.Coordinate(0, 0);
    this.attr._dispPos = new Game.Coordinate(0, 0);
    this.attr._mapID = null;
    this.attr._generator_key = template._generator_key || '';

    this.attr._ID = Game.Util.randomString(16);
    Game.DATASTORE.ENTITY[this.attr._ID] = this;

    // mixins/traits
    this._traits = template.traits || {};
    this._traitTracker = {};
    for (var i = 0; i < this._traits.length; i++) {
        var trait = this._traits[i];
        this._traitTracker[trait.META.traitName] = true;
        this._traitTracker[trait.META.traitGroup] = true;
        for (var traitProp in traitProp != 'META' && trait) {
            if (traitProp != 'META' && trait.hasOwnProperty(traitProp)) {
                this[traitProp] = trait[traitProp];
            }
        }
        if (trait.META.hasOwnProperty('stateNamespace')) {
            this.attr[trait.META.stateNamespace] = {};
            for (var traitStateProp in trait.META.stateModel) {
                if (trait.META.stateModel.hasOwnProperty(traitStateProp)) {
                    if (typeof trait.META.stateModel[traitStateProp] == 'object') {
                        this.attr[trait.META.stateNamespace][traitStateProp] = JSON.parse(JSON.stringify(trait.META.stateModel[traitStateProp]));
                    } else {
                        this.attr[trait.META.stateNamespace][traitStateProp] = trait.META.stateModel[traitStateProp];
                    }
                }
            }
        }
        if (trait.META.hasOwnProperty('init')) {
            trait.META.init.call(this, template);
        }
    }
};

Game.Entity.extend(Game.Symbol);

Game.Entity.prototype.hasTrait = function(check) {
    if (typeof check == 'object') {
        return this._traitTracker.hasOwnProperty(check.META.traitName);
    } else {
        return this._traitTracker.hasOwnProperty(check);
    }
}

Game.Entity.prototype.raiseEntityEvent = function(evtLabel, evtData) {
    for (var i = 0; i < this._traits.length; i++) {
        var trait = this._traits[i];
        if (trait.META.listeners && trait.META.listeners[evtLabel]) {
            trait.META.listeners[evtLabel].call(this, evtData);
        }
    }
};

Game.Entity.prototype.getID = function() {
    return this.attr._ID;
}

Game.Entity.prototype.getMap = function() {
    return Game.DATASTORE.MAP[this.attr._mapID];
};
Game.Entity.prototype.setMap = function(map) {
    this.attr._mapID = map.getID();
};

Game.Entity.prototype.getName = function() {
    return this.attr._name;
};
Game.Entity.prototype.setName = function(name) {
    this.attr._name = name;
};
Game.Entity.prototype.setPos = function(pos) {
    this.attr._position = pos;
};
Game.Entity.prototype.getPos = function() {
    return this.attr._position;
};
Game.Entity.prototype.setDispPos = function(pos) {
    this.attr._dispPos = pos;
};
Game.Entity.prototype.getDispPos = function() {
    return this.attr._dispPos;
};

Game.Entity.prototype.toJSON = function() {
    return Game.UIMode.gamePersistence.BASE_toJSON.call(this);
};

Game.Entity.prototype.fromJSON = function(json) {
    return Game.UIMode.gamePersistence.BASE_fromJSON.call(this, json);
};
