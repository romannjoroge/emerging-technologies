import sqlite3 from "sqlite3";
import encrypt from "../crypto";
import { PasswordType, UpdatePassword } from "../types";

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

    getAllPasswords(): Promise<Password[]> {
        return new Promise((res, rej) => {
            console.log("Getting passwords");
            let passwords: Password[] = [];
            this.db.each("SELECT id, email, password, aob as note, service, username FROM passwords ORDER BY id", (err, row: RawPassword) => {
                if(err) {
                    console.log("Error Getting Passwords =>", err);
                    return rej(new Error("Error Getting Passwords"))
                }

                passwords.push({...row, password: encrypt.decrypt(row.password)})
            }, (err, _) => {
                return res(passwords)
            });
        })
    }

    getPasswordFromID(id: number): Promise<Password | undefined> {
        return new Promise((res, rej) => {
            let pass: RawPassword | undefined
            this.db.get("SELECT id, email, password, aob as note, service, username FROM passwords WHERE id = ? ", [id], (err, row: RawPassword) => {
                if(err) {
                    console.log("Error Getting Password From Database => ", err);
                    return rej(new Error("Could Not Get Password"));
                }
                pass = row;
            }, (err, _) => {
                if (pass) {
                    return res({
                        id: pass.id,
                        email: pass.email,
                        password: encrypt.decrypt(pass.password),
                        note: pass.note,
                        service: pass.service,
                        username: pass.username
                      })
                } else {
                    return res(undefined);
                }
            })
        })
    }

    getPassword(service: string): Promise<Password | undefined> {
        return new Promise((res, rej) => {
            let pass: RawPassword | undefined;
            this.db.get("SELECT id, email, password, aob as note, service, username FROM passwords WHERE service = ? ORDER BY id DESC LIMIT 1 ", [service], (err, row: RawPassword) => {
                if(err) {
                    console.log("Error Getting Password From Database => ", err);
                    return rej(new Error("Could Not Get Password"));
                }
                
            }, (err, _) => {
                if (pass) {
                    return res({
                        id: pass.id,
                        email: pass.email,
                        password: encrypt.decrypt(pass.password),
                        note: pass.note,
                        service: pass.service,
                        username: pass.username
                      })
                } else {
                    return undefined;
                }
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

    deletePasswordWithService(service: string) {
        try {
            this.db.run("DELETE FROM passwords WHERE service = ?", [service]);
        } catch(err) {
            console.log("Error Deleting Password =>", err);
            throw "Error Deleting Password"
        }
    }

    updatePassword(id: number, content: UpdatePassword) {
        try {
            if(content.email) {
                this.db.run("UPDATE passwords SET email = ? WHERE id = ?", [content.email, id])
            }

            if(content.note) {
                this.db.run("UPDATE passwords SET aob = ? WHERE id = ?", [content.note, id])
            }

            if(content.password) {
                const encryptedPassword = encrypt.encrypt(content.password);
                this.db.run("UPDATE passwords SET password = ? WHERE id = ?", [encryptedPassword, id])
            }

            if(content.service) {
                this.db.run("UPDATE passwords SET service = ? WHERE id = ?", [content.service, id])
            }

            if(content.username) {
                this.db.run("UPDATE passwords SET username = ? WHERE id = ?", [content.username, id])
            }
        } catch(err) {
            console.log("Error Updating password", err);
            throw "Error Updating Password";
        }
    }

    updatePasswordWithService(service: string, content: UpdatePassword) {
        try {
            if(content.email) {
                this.db.run("UPDATE passwords SET email = ? WHERE service = ?", [content.email, service])
            }

            if(content.note) {
                this.db.run("UPDATE passwords SET aob = ? WHERE service = ?", [content.note, service])
            }

            if(content.password) {
                const encryptedPassword = encrypt.encrypt(content.password);
                this.db.run("UPDATE passwords SET password = ? WHERE service = ?", [encryptedPassword, service])
            }

            if(content.service) {
                this.db.run("UPDATE passwords SET service = ? WHERE service = ?", [content.service, service])
            }

            if(content.username) {
                this.db.run("UPDATE passwords SET username = ? WHERE service = ?", [content.username, service])
            }
        } catch(err) {
            console.log("Error Updating password", err);
            throw "Error Updating Password";
        }
    }
}

let database = new Database();
export default database;