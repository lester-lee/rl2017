Game.MapTileSets = {
    'dungeon1': {
        _width: 150,
        _height: 150,
        getMapTiles: function() {
            var mapTiles = Game.Util.init2DArray(this._width, this._height, Game.Tile.nullTile);
            var generator = new ROT.Map.Rogue(this._width, this._height);
            generator.create(function(x, y, v) {
                if (v === 0) {
                    mapTiles[x][y] = Game.Tile.floorTile;
                } else {
                    mapTiles[x][y] = Game.Tile.wallTile;
                }
            });

            return mapTiles;
        }
    }
};
