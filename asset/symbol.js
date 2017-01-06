Game.Symbol = function(chr, fgcolor, bgcolor) {
    this.attr = {
        _char: chr,
        _fg: fgcolor || Game.UIMode.DEFAULT_FG,
        _bg: bgcolor || Game.UIMode.DEFAULT_BG
    };
};

Game.Symbol.prototype.getChar = function() {
    return this.attr._char;
};

Game.Symbol.prototype.getFg = function() {
    return this.attr._fg;
};

Game.Symbol.prototype.getBg = function() {
    return this.attr._bg;
};

Game.Symbol.prototype.draw = function(display, x, y) {
    display.draw(x, y, this.attr._char, this.attr._fg, this.attr._bg);
};

Game.Symbol.AVATAR = new Game.Symbol('@', '#f00');
