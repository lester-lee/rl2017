Game.Tile = function(properties) {
    properties = properties || {};
    Game.Symbol.call(this, properties);
    if (!('attr' in this)) { this.attr = {}; }
    this.attr._name = properties.name;
};

Game.Tile.extend(Game.Symbol);

Game.Tile.prototype.getName = function() {
    return this.attr._name;
}

/*
 * Game Tiles
 */

Game.Tile.nullTile = new Game.Tile({name: 'null'});
Game.Tile.floorTile = new Game.Tile({name: 'floor', chr:'.'});
Game.Tile.wallTile = new Game.Tile({name: 'wall', chr:'#'});
