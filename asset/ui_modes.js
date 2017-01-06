Game.UIMode = {};
Game.UIMode.DEFAULT_FG = '#fff';
Game.UIMode.DEFAULT_BG = '#000';
var fg = Game.UIMode.DEFAULT_FG;
var bg = Game.UIMode.DEFAULT_BG;

Game.UIMode.gameStart = {
    enter: function() {
        // console.log("gamestart enter");
        Game.Message.send('from forth the fatal loins of these two foes...');
    },
    exit: function() {
        // console.log("gamestart exit");
    },
    render: function(display) {
        // console.log("gamestart render");
        display.drawText(2, 2, "It's a game!", fg, bg);
        display.drawText(2, 2, "It's a game!", fg, bg);
        display.drawText(2, 3, "Press any key to continue.");
    },
    handleInput: function(inputType, inputData) {
        // console.log("gamestart input");
        // ignore modding keys
        if (inputData.charCode !== 0) {
            Game.switchUIMode(Game.UIMode.gamePersistence);
        }
    }
};

Game.UIMode.gamePlay = {
    attr: {
        _map: null,
        _avatarX: 10,
        _avatarY: 10,
        _mapWidth: 60,
        _mapHeight: 25,
        _wasd: 0,
        _wasdKeys: {
            1: ROT.VK_Z,
            2: ROT.VK_X,
            3: ROT.VK_C,
            4: ROT.VK_A,
            5: ROT.VK_S,
            6: ROT.VK_D,
            7: ROT.VK_Q,
            8: ROT.VK_W,
            9: ROT.VK_E
        },
        _numpadKeys: {
            1: ROT.VK_NUMPAD1,
            2: ROT.VK_NUMPAD2,
            3: ROT.VK_NUMPAD3,
            4: ROT.VK_NUMPAD4,
            5: ROT.VK_NUMPAD5,
            6: ROT.VK_NUMPAD6,
            7: ROT.VK_NUMPAD7,
            8: ROT.VK_NUMPAD8,
            9: ROT.VK_NUMPAD9
        }
    },
    enter: function() {
        // console.log("gamePlay enter");
        Game.Message.send('a pair of star-crossed lovers take their life');
        Game.refresh();
    },
    exit: function() {
        // console.log("gamePlay exit");
        Game.refresh();
    },
    render: function(display) {
        // console.log("gamePlay render");
        display.drawText(1, 1, "the following two sentences are false", fg, bg);
        display.drawText(1, 3, "press [W] to win", fg, bg);
        display.drawText(1, 4, "press [L] to lose", fg, bg);
        display.drawText(1, 5, "press [=] to save/load/new", fg, bg);
        this.attr._map.renderOn(display);
        this.renderAvatar(display);
    },
    renderAvatar: function(display) {
        Game.Symbol.AVATAR.draw(display, this.attr._avatarX, this.attr._avatarY);
    },
    renderAvatarInfo: function(display) {
        display.drawText(1, 2, "avatar x:" + this.attr._avatarX, fg, bg); // DEV
        display.drawText(1, 3, "avatar y:" + this.attr._avatarY, fg, bg); // DEV
    },
    moveAvatar: function(dx, dy) {
        this.attr._avatarX = Math.min(Math.max(0, this.attr._avatarX + dx), this.attr._mapWidth);
        this.attr._avatarY = Math.min(Math.max(0, this.attr._avatarY + dy), this.attr._mapHeight);
        // console.log(this.attr._avatarX + " " + this.attr._avatarY);
    },
    handleInput: function(inputType, inputData) {
        // console.log("gamePlay input");
        var movementKeys = this.attr._numpadKeys;
        if (this.attr._wasd === 1) {
            movementKeys = this.attr._wasdKeys;
        }
        if (inputType == 'keydown') {
            switch (inputData.keyCode) {
                // Movement commands
                case movementKeys[1]:
                    this.moveAvatar(-1, 1);
                    break;
                case movementKeys[2]:
                    this.moveAvatar(0, 1);
                    break;
                case movementKeys[3]:
                    this.moveAvatar(1, 1);
                    break;
                case movementKeys[4]:
                    this.moveAvatar(-1, 0);
                    break;
                case movementKeys[5]:
                    // stand still
                    break;
                case movementKeys[6]:
                    this.moveAvatar(1, 0);
                    break;
                case movementKeys[7]:
                    this.moveAvatar(-1, -1);
                    break;
                case movementKeys[8]:
                    this.moveAvatar(0, -1);
                    break;
                case movementKeys[9]:
                    this.moveAvatar(1, -1);
                    break;
                default:
                    break;
            }
            Game.refresh();
        } else {
            switch (inputData.keyCode) {
                case ROT.VK_L:
                    if (inputData.shiftKey) {
                        Game.switchUIMode(Game.UIMode.gameLose);
                    }
                    break;
                case ROT.VK_W:
                    if (inputData.shiftKey) {
                        Game.switchUIMode(Game.UIMode.gameWin);
                    }
                    break;
                case ROT.VK_EQUALS:
                    Game.switchUIMode(Game.UIMode.gamePersistence);
                    break;
                default:
                    break;
            }
        }
    },
    setupPlay: function() {
        var mapTiles = Game.util.init2DArray(this.attr._mapWidth, this.attr._mapHeight, Game.Tile.nullTile);
        var generator = new ROT.Map.Cellular(this.attr._mapWidth, this.attr._mapHeight);
        generator.randomize(0.5);

        // repeated cellular automata process
        var totalIterations = 3;
        for (var i = 0; i < totalIterations - 1; i++) {
            generator.create();
        }

        //update map
        generator.create(function(x, y, v) {
            if (v === 1) {
                mapTiles[x][y] = Game.Tile.floorTile;
            } else {
                mapTiles[x][y] = Game.Tile.wallTile;
            }
        });
        this.attr._map = new Game.Map(mapTiles);
    }
};

Game.UIMode.gameWin = {
    enter: function() {
        // console.log("gameWin enter");
        Game.Message.send('and Shelley sold seashells by the seashore');
    },
    exit: function() {
        // console.log("gameWin exit");
    },
    render: function(display) {
        // console.log("gameWin render");
        display.drawText(1, 2, "yer a winner", fg, bg);
        display.drawText(1, 2, "yer a winner", fg, bg);
        display.drawText(1, 3, "press [ESC] to play again", fg, bg);
        display.drawText(1, 3, "press [ESC] to play again", fg, bg);
    },
    handleInput: function(inputType, inputData) {
        // console.log("gameWin input");
        if (inputData.keyCode == ROT.VK_ESCAPE) {
            Game.switchUIMode(Game.UIMode.gameStart);
        }
    }
};

Game.UIMode.gameLose = {
    enter: function() {
        // console.log("gameLose enter");
        Game.Message.send('HP: deaded');
    },
    exit: function() {
        // console.log("gameLose exit");
    },
    render: function(display) {
        // console.log("gameLose render");
        display.drawText(1, 2, "ya lost boi", fg, bg);
        display.drawText(1, 2, "ya lost boi", fg, bg);
        display.drawText(1, 3, "press [ESC] to play again", fg, bg);
        display.drawText(1, 3, "press [ESC] to play again", fg, bg);
    },
    handleInput: function(inputType, inputData) {
        // console.log("gameLose input");
        if (inputData.keyCode == ROT.VK_ESCAPE) {
            Game.switchUIMode(Game.UIMode.gameStart);
        }
    }
};

Game.UIMode.gamePersistence = {
    enter: function() {
        // console.log("gamePersistence enter");
        Game.Message.send('save, restore, or start a new game');
    },
    exit: function() {
        // console.log("gamePersistence exit");
    },
    render: function(display) {
        // console.log("gamePersistence render");
        display.drawText(1, 2, "S to save, L to load, N for new game", fg, bg);
        display.drawText(1, 2, "S to save, L to load, N for new game", fg, bg);
    },
    handleInput: function(inputType, inputData) {
        // console.log("gamePersistence input");
        if (inputType == 'keypress' && inputData.shiftKey) {
            switch (inputData.keyCode) {
                case (ROT.VK_S):
                    this.saveGame();
                    break;
                case (ROT.VK_L):
                    this.loadGame();
                    break;
                case (ROT.VK_N):
                    this.newGame();
                    break;
                default:
                    break;
            }
        }
    },
    saveGame: function() {
        if (this.localStorageAvailable()) {
            window.localStorage.setItem(Game.PERSISTENCE_NAMESPACE, JSON.stringify(Game));
            Game.switchUIMode(Game.UIMode.gamePlay);
        }
        Game.switchUIMode(Game.UIMode.gamePlay);
    },
    loadGame: function() {
        var json_state_data = window.localStorage.getItem(Game.PERSISTENCE_NAMESPACE);
        var state_data = JSON.parse(json_state_data);
        // console.dir(state_data);
        Game.setRandomSeed(state_data._randomSeed);
        Game.UIMode.gamePlay.setupPlay();
        Game.switchUIMode(Game.UIMode.gamePlay);
    },
    newGame: function() {
        Game.setRandomSeed(5 + Math.floor(ROT.RNG.getUniform() * 100000));
        Game.UIMode.gamePlay.setupPlay();
        Game.switchUIMode(Game.UIMode.gamePlay);
    },
    localStorageAvailable: function() { // NOTE: see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
        try {
            var x = '__storage_test__';
            window.localStorage.setItem(x, x);
            window.localStorage.removeItem(x);
            return true;
        } catch (e) {
            Game.Message.send('Sorry, no local data storage is available for this browser');
            return false;
        }
    }
};
