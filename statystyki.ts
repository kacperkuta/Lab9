import * as sqlite3 from 'sqlite3';
import {createServer} from 'http';
import {Database} from "sqlite3";
import {promisify} from 'util';
import * as fs from 'fs';

let open = promisify(fs.open);
let db : Database;
sqlite3.verbose();
db = new sqlite3.Database('baza.db');

let server = createServer(async (req, res) => {
    console.log(req.url);
    res.writeHead(200, {'Content-Type' : 'text/html'});
    if (req.url == "/statystyki") {
        res.write("<h1>Statystyki</h1>");
        db.all('SELECT sciezka, liczba FROM wyswietlenia;', [], (err, rows) => {
            if (err)
                throw (err);

            for (let {sciezka, liczba} of rows) {
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

async function zalozBaze() {
    await db.run('CREATE TABLE IF NOT EXISTS wyswietlenia (sciezka VARCHAR(255), liczba INT);');
}

function wystapienie(filename : string) {
    console.log('SELECT liczba from wyswietlenia WHERE sciezka = "' + filename + '";');
    return new Promise<any>(function(resolve, reject) {
        db.get('SELECT liczba from wyswietlenia WHERE sciezka = "' + filename + '";', (error, result) => {
            let num = NaN;
            if (result != undefined)
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

async function start() {
    await zalozBaze();
    server.listen(8080);
}

start();

