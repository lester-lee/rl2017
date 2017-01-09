Game.Map = function(tilesGrid) {
    this.attr = {
        _tiles: tilesGrid,
        _width: tilesGrid.length,
        _height: tilesGrid[0].length
    };
};

Game.Map.prototype.getWidth = function() {
    return this.attr._width;
};

Game.Map.prototype.getHeight = function() {
    return this.attr._height;
};

Game.Map.prototype.getTile = function(pos) {
    x = pos.x;
    y = pos.y;
    if ((x < 0) || (x >= this.attr._width) ||
        (y < 0) || (y >= this.attr._height)) {
        return Game.Tile.nullTile;
    }
    return this.attr._tiles[x][y] || Game.Tile.nullTile;
};

Game.Map.prototype.getWalkableTilePos = function(){
  var avMapX = Math.round(ROT.RNG.getNormal(.5, .1) * this.attr._width);
  var avMapY = Math.round(ROT.RNG.getNormal(.5, .1) * this.attr._height);
  var pos = new Game.Coordinate(avMapX,avMapY);
  while (!this.getTile(pos).isWalkable()) {
        pos.x++;
        pos.y++;
  }
  return pos;
};

Game.Map.prototype.renderOn = function(display, camX, camY) {
    var dispW = display._options.width;
    var dispH = display._options.height;
    var xStart = camX-Math.round(dispW / 2);
    var yStart = camY-Math.round(dispH / 2);
    for (var x = 0; x < dispW; x++) {
        for (var y = 0; y < dispH; y++) {
            var pos = new Game.Coordinate(x+xStart, y+yStart);
            var tile = this.getTile(pos);
            if (tile.getName() == 'null') {
                tile = Game.Tile.wallTile;
            }
            tile.draw(display, x, y);
        }
    }
};
