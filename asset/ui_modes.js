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
        _avatar: null,
        _cameraX: 50,
        _cameraY: 50,
        _mapWidth: 100,
        _mapHeight: 100,
        _wasd: 1,
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
    JSON_KEY: 'uiMode_gamePlay',
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
        this.attr._map.renderOn(display, this.attr._cameraX, this.attr._cameraY);
        this.renderAvatar(display);
    },
    renderAvatar: function(display) {
        var avX = this.attr._avatar.getPos().x - this.attr._cameraX + Math.round(display._options.width / 2);
        var avY = this.attr._avatar.getPos().y - this.attr._cameraY + Math.round(display._options.height / 2);
        this.attr._avatar.setDispPos(new Game.Coordinate(avX, avY));
        Game.Symbol.AVATAR.draw(display, avX, avY);
    },
    renderAvatarInfo: function(display) {
        //     display.drawText(1, 2, "avatar x:" + this.attr._avatar.getX(), fg, bg); // DEV
        //     display.drawText(1, 3, "avatar y:" + this.attr._avatar.getY(), fg, bg); // DEV
        //     display.drawText(1, 4, "camera x:" + this.attr._cameraX, fg, bg); // DEV
        //     display.drawText(1, 5, "camera y:" + this.attr._cameraY, fg, bg); // DEV
        display.drawText(1, 1, "HP: " + this.attr._avatar.getCurHP() + "/" + this.attr._avatar.getMaxHP());
    },
    moveAvatar: function(dx, dy) {
        if (this.attr._avatar.tryWalk(this.attr._map, dx, dy)) {
            Game.refresh();
            this.checkMoveCamera();
        }
    },
    checkMoveCamera: function() {
        // camera follows player
        // this.setCameraToAvatar();

        // camera scrolls when player reaches threshold
        this.setWindowCamera(.35, .65);
    },
    moveCamera: function(dx, dy) {
        this.setCamera(this.attr._cameraX + dx, this.attr._cameraY + dy)
    },
    setCamera: function(sx, sy) {
        var display = Game.getDisplay('main');
        var dispW2 = Math.round(display._options.width / 2);
        var dispH2 = Math.round(display._options.height / 2);
        this.attr._cameraX = Math.min(Math.max(dispW2, sx), this.attr._mapWidth - dispW2);
        this.attr._cameraY = Math.min(Math.max(dispH2, sy), this.attr._mapHeight - dispH2);
    },
    setCameraToAvatar: function() {
        this.setCamera(this.attr._avatar.getPos().x, this.attr._avatar.getPos().y);
    },
    setWindowCamera: function(min, max) {
        var display = Game.getDisplay('main');
        var dispW = display._options.width;
        var dispH = display._options.height;
        if (this.attr._avatar.getDispPos().x < Math.round(min * dispW)) {
            this.moveCamera(-1, 0);
        }
        if (this.attr._avatar.getDispPos().x > Math.round(max * dispW)) {
            this.moveCamera(1, 0);
        }
        if (this.attr._avatar.getDispPos().y < Math.round(min * dispH)) {
            this.moveCamera(0, -1);
        }
        if (this.attr._avatar.getDispPos().y > Math.round(max * dispH)) {
            this.moveCamera(0, 1);
        }
    },
    setupPlay: function(loadData) {
        var mapTiles = Game.Util.init2DArray(this.attr._mapWidth, this.attr._mapHeight, Game.Tile.nullTile);
        var generator = new ROT.Map.Rogue(this.attr._mapWidth, this.attr._mapHeight);

        generator.create(function(x, y, v) {
            if (v === 0) {
                mapTiles[x][y] = Game.Tile.floorTile;
            } else {
                mapTiles[x][y] = Game.Tile.wallTile;
            }
        });
        this.attr._map = new Game.Map(mapTiles);
        this.setupAvatar();
        if (loadData !== undefined && loadData.hasOwnProperty(Game.UIMode.gamePlay.JSON_KEY)) {
            this.fromJSON(loadData[Game.UIMode.gamePlay.JSON_KEY]);
        }
    },
    setupAvatar: function() {
        var avatar = new Game.Entity(Game.EntityTemplates.Avatar);
        var pos = this.attr._map.getWalkableTilePos();
        avatar.setPos(pos);
        this.attr._avatar = avatar;
        this.setCameraToAvatar();
    },
    handleInput: function(inputType, inputData) {
        // console.log("gamePlay input");
        var movementKeys = this.attr._numpadKeys;
        if (this.attr._wasd === 1) {
            movementKeys = this.attr._wasdKeys;
        }
        // console.log(inputData.keyCode);
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
                case ROT.VK_BACK_SLASH:
                    // change movement input keys
                    this.attr._wasd = (this.attr._wasd === 0) ? 1 : 0;
                    break;
                default:
                    break;
            }
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
    toJSON: function() {
        return Game.UIMode.gamePersistence.BASE_toJSON.call(this);
    },
    fromJSON: function(json) {
        return Game.UIMode.gamePersistence.BASE_fromJSON.call(json, this);
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
        Game.UIMode.gamePlay.setupPlay(state_data);
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
    },
    BASE_toJSON: function(state_hash_name) {
        var state = this.attr;
        if (state_hash_name) {
            state = this[state_hash_name];
        }
        var json = {};
        for (var at in state) {
            if (state.hasOwnProperty(at)) {
                if (state[at] instanceof Object && 'toJSON' in state[at]) {
                    json[at] = state[at].toJSON();
                } else {
                    json[at] = state[at];
                }
            }
        }
        return json;
    },
    BASE_fromJSON: function(json, state_hash_name) {
        var using_state_hash = 'attr';
        if (state_hash_name) {
            using_state_hash = state_hash_name;
        }
        console.dir(this);
        for (var at in this[using_state_hash]) {
          console.dir(this[using_state_hash][at]);
            if (this[using_state_hash][at] instanceof Object && 'fromJSON' in this[using_state_hash][at]) {
                this[using_state_hash][at].fromJSON(json[at]);
            } else {
                this[using_state_hash][at] = json[at];
            }
        }
    }
};
