"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var sqlite3 = require("sqlite3");
var fs = require("fs");
var path = require("path");
var MemesFileService = /** @class */ (function () {
    function MemesFileService() {
    }
    MemesFileService.createDatabase = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sqlite3.verbose();
                        db = new sqlite3.Database('baza.db');
                        return [4 /*yield*/, db.run('DROP TABLE IF EXISTS memes', function () {
                                db.run('CREATE TABLE IF NOT EXISTS memes (id INT UNIQUE, name VARCHAR(255), price INT, url VARCHAR(510));', function () {
                                    db.run('CREATE TABLE IF NOT EXISTS visited_sites (counter INT UNIQUE);', callback);
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MemesFileService.addMeme = function (m) {
        return new Promise(function (resolve) {
            var db = new sqlite3.Database('baza.db');
            db.run('INSERT INTO memes (id, name, price, url) VALUES (' + m.id + ', "' + m.name + '", ' + m.price + ', "' + m.url + '");', function () {
                fs.writeFileSync('./prices/' + m.id + '.prices', m.price + ', ');
                resolve();
            });
        });
    };
    MemesFileService.addMemes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, MemesFileService.addMeme(new Meme(10, "Gold", 1000, 'https://memy.pl/show/big/uploads/Post/15134/14436373211238.jpg'))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, MemesFileService.addMeme(new Meme(9, 'Platinum', 1100, 'https://d-art.ppstatic.pl/kadry/k/r/1/32/ee/5eb1274b63bfd_o_medium.jpg'))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, MemesFileService.addMeme(new Meme(8, 'Elite', 1200, 'https://d-pt.ppstatic.pl/k/r/1/6e/ca/5c5690fd6c66e_p.jpg?1549488181'))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, MemesFileService.addMeme(new Meme(7, 'Top7', 1300, 'https://i1.memy.pl/obrazki/65fd1051545_gdzie_jest_biedron.jpg'))];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, MemesFileService.addMeme(new Meme(6, 'Top6', 1400, 'https://www.wprost.pl/_thumb/ec/f6/a4babe3f1xx0d7c49e021ceff347.jpeg'))];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, MemesFileService.addMeme(new Meme(5, 'Top5', 1500, 'https://i.ytimg.com/vi/Y6CWwGZ4Ndw/maxresdefault.jpg'))];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, MemesFileService.addMeme(new Meme(4, 'Top4', 1600, 'https://m.sadeczanin.info/sites/default/files/journos/user11/2m.png'))];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, MemesFileService.addMeme(new Meme(3, 'Top3', 1700, 'https://www.wprost.pl/_thumb/5f/30/63e91d245ec0d6eed288c8bb8592.jpeg'))];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, MemesFileService.addMeme(new Meme(2, 'Top2', 1800, 'https://www.wprost.pl/_thumb/88/d1/59645018e80acaec629c25733bcc.jpeg'))];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, MemesFileService.addMeme(new Meme(1, 'Top1', 1900, 'https://i.pinimg.com/originals/39/17/07/3917070f6181a43167733ac86c8a2306.jpg'))];
                    case 10:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MemesFileService;
}());
var Meme = /** @class */ (function () {
    function Meme(id, name, actualPrice, url) {
        this._id = id;
        this._name = name;
        this._price = actualPrice;
        this._url = url;
        this._priceTable = new Array();
    }
    Object.defineProperty(Meme.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Meme.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Meme.prototype, "price", {
        get: function () {
            return this._price;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Meme.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Meme.prototype, "priceTable", {
        get: function () {
            return this._priceTable;
        },
        enumerable: false,
        configurable: true
    });
    Meme.prototype.setProperHist = function () {
        var f = fs.readFileSync('./prices/' + this._id + '.prices');
        var pricesString = f.toString();
        while (pricesString.length > 0) {
            this._priceTable.push(+pricesString.substring(0, pricesString.search(',')));
            pricesString = pricesString.substring(pricesString.search(' ') + 1);
        }
        this.priceTable.reverse();
    };
    Meme.prototype.changePrice = function (price) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new sqlite3.Database('baza.db');
            db.run("UPDATE memes SET price = " + price + " WHERE id = " + _this._id + ";", function () {
                _this._price = price;
                fs.appendFileSync('./prices/' + _this._id + '.prices', price + ', ');
                _this.setProperHist();
                resolve();
            });
        });
    };
    return Meme;
}());
function get_meme(id) {
    return new Promise((function (resolve) {
        var db = new sqlite3.Database('baza.db');
        var mem = null;
        db.get("SELECT * from memes WHERE id = " + id + ';', function (err, result) {
            mem = new Meme(result.id, result.name, result.price, result.url);
            mem.setProperHist();
            resolve(mem);
        });
    }));
}
var createCallback = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MemesFileService.addMemes()];
            case 1:
                _a.sent();
                app.get('/', function (req, res) {
                    if (req.session.views) {
                        req.session.views++;
                    }
                    else {
                        req.session.views = 1;
                    }
                    if (req.session.exp) {
                        if (new Date(Date.now()) > new Date(req.session.exp)) {
                            req.session.views = 1;
                            req.session.exp = new Date(Date.now() + 15 * 1000 * 60);
                        }
                    }
                    else {
                        req.session.exp = new Date(Date.now() + 15 * 1000 * 60);
                    }
                    var db = new sqlite3.Database('baza.db');
                    db.all("SELECT * FROM memes ORDER BY price DESC LIMIT 3;", [], function (err, rows) {
                        var mostExp = new Array();
                        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                            var _a = rows_1[_i], id = _a.id, name_1 = _a.name, price = _a.price, url = _a.url;
                            mostExp.push(new Meme(id, name_1, price, url));
                        }
                        res.render('index', { title: 'Meme market', message: 'Hello there!', memes: mostExp, visited: req.session.views });
                    });
                });
                app.get('/meme/:memeId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var meme;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (req.session.views) {
                                    req.session.views++;
                                }
                                else {
                                    req.session.views = 1;
                                }
                                if (req.session.exp) {
                                    if (new Date(Date.now()) > new Date(req.session.exp)) {
                                        req.session.views = 1;
                                        req.session.exp = new Date(Date.now() + 15 * 1000 * 60);
                                    }
                                }
                                else {
                                    req.session.exp = new Date(Date.now() + 15 * 1000 * 60);
                                }
                                return [4 /*yield*/, get_meme(req.params.memeId)];
                            case 1:
                                meme = _a.sent();
                                res.render('meme', { meme: meme, visited: req.session.views });
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.post('/meme/:memeId/:newPrice', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var meme, price;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, get_meme(req.params.memeId)];
                            case 1:
                                meme = _a.sent();
                                price = req.params.newPrice;
                                return [4 /*yield*/, meme.changePrice(price)];
                            case 2:
                                _a.sent();
                                res.render('meme', { meme: meme, visited: req.session.views });
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.listen(port);
                return [2 /*return*/];
        }
    });
}); };
var express = require('express');
var app = express();
var port = 3000;
var session = require('express-session');
var MySQLStore = require('express-mysql-session');
var options = {
    host: 'localhost',
    database: 'session_test',
    createDatabaseTable: true,
    port: 12345
};
app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use("/script", express.static(path.join(__dirname, ".")));
app.use(session({
    key: "session",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(options)
}));
//MemesFileService.createDatabase(createCallback);
app.listen(1234);
