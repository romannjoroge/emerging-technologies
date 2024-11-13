import sqlite3 from "sqlite3";
import encrypt from "../crypto";
import { PasswordType } from "../types";

interface Neighbour {
    id: number,
    name: string,
    address: string
}

interface RawPassword {
    id: number,
    email?: string,
    password: Buffer,
    note?: string,
    service: string
    username?: string
}

interface Password {
    id: number,
    email?: string,
    password: string,
    note?: string,
    service: string
    username?: string
}

class Database {
    private db = new sqlite3.Database('db');
    constructor() {
        try {
            this.db.serialize(() => {
                this.db.run("CREATE TABLE IF NOT EXISTS neighbours (id INTEGER PRIMARY KEY, name TEXT NOT NULL, address TEXT NOT NULL)");
                this.db.run("CREATE TABLE IF NOT EXISTS passwords (id INTEGER PRIMARY KEY, service TEXT NOT NULL, password BLOB NOT NULL, username TEXT, email TEXT, aob TEXT)");
            })
        } catch (err) {
            console.log("Could Not Create Database => ", err);
        }
    }

    storeNeighbour(name: string, address: string) {
        try {
            const stmt = this.db.prepare("INSERT INTO neighbours (name, address) VALUES (?, ?)");
            stmt.run(name, address);
            stmt.finalize()
        } catch (err) {
            console.log("Error Storing Neighbour =>", err);
            throw "Error Storing Neighbour";
        }
    }

    getNeighbours(): Promise<Neighbour[]> {
        return new Promise((res, rej) => {
            let neighbours: Neighbour[] = []
            this.db.each("SELECT id, name, address FROM neighbours", (err, row: Neighbour) => {
                if (err) {
                    return rej("Could Not Get Neighbours");
                } else {
                    console.log(row);
                    neighbours.push({
                        id: row.id,
                        name: row.name,
                        address: row.address
                    })
                }
            }, (err, _) => {
                return res(neighbours);
            })
        })
    }

    getPassword(service: string): Promise<Password> {
        return new Promise((res, rej) => {
            this.db.get("SELECT id, email, password, aob as note, service, username FROM passwords WHERE service = ? ORDER BY id DESC LIMIT 1 ", [service], (err, row: RawPassword) => {
                if(err) {
                    console.log("Error Getting Password From Database => ", err);
                    return rej(new Error("Could Not Get Password"));
                }
                return res({
                  id: row.id,
                  email: row.email,
                  password: encrypt.decrypt(row.password),
                  note: row.note,
                  service: row.service,
                  username: row.username
                })
            })
        })
    }

    storePassword(password: PasswordType) {
        try {
            // Encrypt password
            const encryptedPassword = encrypt.encrypt(password.password);

            // Store details in DB
            this.db.run("INSERT INTO passwords (service, password, username, email, aob) VALUES (?, ?, ?, ?, ?)", 
                [password.service, encryptedPassword, password.username, password.email, password.note])
        } catch(err) {
            console.log("Error Storing Password => ", err);
            throw "Error Storing Password";
        }
    }

    deletePassword(id: number) {
        try {
            this.db.run("DELETE FROM passwords WHERE id = ?", [id]);
        } catch(err) {
            console.log("Error Deleting Password =>", err);
            throw "Error Deleting Password"
        }
    }
}

let database = new Database();
export default database;