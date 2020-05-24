import * as sqlite3 from 'sqlite3';
import * as fs from "fs";
import path = require("path");

class MemesFileService {
    static async createDatabase(callback) {
        sqlite3.verbose();
        const db = new sqlite3.Database('baza.db');
        await db.run('DROP TABLE IF EXISTS memes', () => {
            db.run('CREATE TABLE IF NOT EXISTS memes (id INT UNIQUE, name VARCHAR(255), price INT, url VARCHAR(510));', callback);
        });
    }

    static addMeme(m: Meme): Promise<any> {
        return new Promise<any>((resolve) => {
            const db = new sqlite3.Database('baza.db');
            db.run('INSERT INTO memes (id, name, price, url) VALUES (' + m.id + ', "' + m.name + '", ' + m.price + ', "' + m.url + '");', () => {
                fs.writeFileSync('./prices/' + m.id + '.prices', m.price + ', ');
                resolve();
            });
        });
    }

    static async addMemes() {
        await MemesFileService.addMeme(new Meme(10, "Gold", 1000, 'https://memy.pl/show/big/uploads/Post/15134/14436373211238.jpg'));
        await MemesFileService.addMeme(new Meme(9, 'Platinum', 1100, 'https://d-art.ppstatic.pl/kadry/k/r/1/32/ee/5eb1274b63bfd_o_medium.jpg'));
        await MemesFileService.addMeme(new Meme(8, 'Elite', 1200, 'https://d-pt.ppstatic.pl/k/r/1/6e/ca/5c5690fd6c66e_p.jpg?1549488181'));
        await MemesFileService.addMeme(new Meme(7, 'Top7', 1300, 'https://i1.memy.pl/obrazki/65fd1051545_gdzie_jest_biedron.jpg'));
        await MemesFileService.addMeme(new Meme(6, 'Top6', 1400, 'https://www.wprost.pl/_thumb/ec/f6/a4babe3f1xx0d7c49e021ceff347.jpeg'));
        await MemesFileService.addMeme(new Meme(5, 'Top5', 1500, 'https://i.ytimg.com/vi/Y6CWwGZ4Ndw/maxresdefault.jpg'));
        await MemesFileService.addMeme(new Meme(4, 'Top4', 1600, 'https://m.sadeczanin.info/sites/default/files/journos/user11/2m.png'));
        await MemesFileService.addMeme(new Meme(3, 'Top3', 1700, 'https://www.wprost.pl/_thumb/5f/30/63e91d245ec0d6eed288c8bb8592.jpeg'));
        await MemesFileService.addMeme(new Meme(2, 'Top2', 1800, 'https://www.wprost.pl/_thumb/88/d1/59645018e80acaec629c25733bcc.jpeg'));
        await MemesFileService.addMeme(new Meme(1, 'Top1', 1900, 'https://i.pinimg.com/originals/39/17/07/3917070f6181a43167733ac86c8a2306.jpg'));
    }
}

class Meme {
    constructor(id: number, name: string, actualPrice: number, url: string) {
        this._id = id;
        this._name = name;
        this._price = actualPrice;
        this._url = url;
        this._priceTable = new Array<number>();
    }

    private _id: number;
    private _name: string;
    private _price: number;
    private _url: string;
    private _priceTable: Array<number>;


    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get url(): string {
        return this._url;
    }

    get priceTable(): Array<number> {
        return this._priceTable;
    }

    setProperHist() {
        const f: Buffer = fs.readFileSync('./prices/' + this._id + '.prices');
        let pricesString: string = f.toString();
        while (pricesString.length > 0) {
            this._priceTable.push(+pricesString.substring(0, pricesString.search(',')));
            pricesString = pricesString.substring(pricesString.search(' ') + 1);
        }
        this.priceTable.reverse();
    }

    changePrice(price: number): Promise<any> {
        return new Promise<any>((resolve) => {
            const db: sqlite3.Database = new sqlite3.Database('baza.db');
            db.run("UPDATE memes SET price = " + price + " WHERE id = " + this._id + ";", () => {
                this._price = price;
                fs.appendFileSync('./prices/' + this._id + '.prices', price + ', ');
                this.setProperHist();
                resolve();
            })
        })

    }
}

function get_meme(id: number): Promise<Meme> {
    return new Promise<Meme>(((resolve) => {
        const db: sqlite3.Database = new sqlite3.Database('baza.db');
        let mem: Meme = null;
        db.get("SELECT * from memes WHERE id = " + id + ';', (err, result) => {
            mem = new Meme(result.id, result.name, result.price, result.url);
            mem.setProperHist();
            resolve(mem);
        })
    }))
}

const createCallback = async () => {
    await MemesFileService.addMemes();
    app.get('/', (req, res) => {
        const db: sqlite3.Database = new sqlite3.Database('baza.db');
        db.all("SELECT * FROM memes ORDER BY price DESC LIMIT 3;", [], (err, rows) => {
            const mostExp = new Array<Meme>();
            for (const {id, name, price, url} of rows) {
                mostExp.push(new Meme(id, name, price, url));
            }
            res.render('index', {title: 'Meme market', message: 'Hello there!', memes: mostExp})
        });
    });
    app.get('/meme/:memeId', async (req, res) => {
        const meme = await get_meme(req.params.memeId);
        res.render('meme', {meme});

    });
    app.post('/meme/:memeId/:newPrice', async (req, res) => {
        const meme = await get_meme(req.params.memeId);
        const price = req.params.newPrice;
        await meme.changePrice(price);
        res.render('meme', {meme});
    });
    app.listen(port);
};

const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use("/script", express.static(path.join(__dirname, ".")));


MemesFileService.createDatabase(createCallback);


