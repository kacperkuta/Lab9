import * as sqlite3 from 'sqlite3';
import {createServer} from 'http';
import {Database} from "sqlite3";
import {promisify} from 'util';
import * as fs from 'fs';

const open = promisify(fs.open);
let db : Database;
sqlite3.verbose();
db = new sqlite3.Database('baza.db');

const server = createServer(async (req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    if (req.url === "/statystyki") {
        res.write("<h1>Statystyki</h1>");
        db.all('SELECT sciezka, liczba FROM wyswietlenia;', [], (err, rows) => {
            if (err)
                throw (err);

            for (const {sciezka, liczba} of rows) {
                res.write(sciezka + '->' + liczba + '<br>');
            }
            res.end();
        });
    } else {
        open(req.url.substring(1), 'r').then((_fd) => {
            wystapienie(req.url.substring(1)).then( () => {
                    fs.readFile(req.url.substring(1), (error, data) => {
                        res.write('<h1>Tresc pliku: </h1> <br>' + data);
                        res.end();
                    });
                }
            )

        }).catch( (error) => {
            res.write("<p>File error!</p>" + error.toString());
            res.end();
        })
    }
});

async function zalozBaze() : Promise<any> {
    return new Promise<any>((resolve) => {
        db.run('DROP TABLE IF EXISTS wyswietlenia);', async () => {
            await db.run('CREATE TABLE wyswietlenia (sciezka VARCHAR(255), liczba INT);');
            resolve();
        });
    });
}

async function createDatabase(callback) {
    db.run('DROP TABLE IF EXISTS wyswietlenia', () => {
        db.run('CREATE TABLE wyswietlenia (sciezka VARCHAR(255), liczba INT);', callback);
    });
}

function wystapienie(filename : string) {
    return new Promise<any>((resolve, reject) => {
        db.get('SELECT liczba from wyswietlenia WHERE sciezka = "' + filename + '";', (error, result) => {
            let num = NaN;
            if (result !== undefined)
                num = result.liczba;
            if (isNaN(num))
                num = 1;
            else
                num++;
            db.run('DELETE from wyswietlenia WHERE sciezka = "' + filename + '";', () => {
                db.run('INSERT INTO wyswietlenia (sciezka, liczba) VALUES ("' + filename + '", ' + num + ');', () =>
                resolve())
            });
        });
        return 0;
    });
}

createDatabase(() => {server.listen(8080)});
