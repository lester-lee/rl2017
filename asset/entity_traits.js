Game.EntityTraits = {};

Game.EntityTraits.WalkerCorporeal = {
  META: {
    traitName: 'WalkerCorporeal',
    traitGroup: 'Walker'
  },
  tryWalk: function(map,dx,dy){
    var newX = Math.min(Math.max(0, this.getX()), map.getWidth()) + dx;
    var newY = Math.min(Math.max(0, this.getY()), map.getWidth()) + dy;
    var nextTile = map.getTile(newX, newY);
    if (nextTile.isWalkable()) {
        this.setPos(newX,newY);
        return true;
    }
    return false;
  }
};
