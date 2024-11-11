import lmdb from "node-lmdb";
import { SETTINGS_STORE } from "../constants";

class Store {
    private env = new lmdb.Env();
    private dbi: lmdb.Dbi
    
    constructor() {
        this.env.open({
            // IMPORTANT: you will get an error if the directory doesn't exist!
            path: "./data",
            // Maximum number of databases
            maxDbs: 10
        });

        this.dbi = this.env.openDbi({
            name: SETTINGS_STORE,
            create: true
        })
    }

    read(key: string): string {
        try {
            const txn = this.env.beginTxn();
            const data = txn.getString(this.dbi, key);
            txn.commit();
            return data;
        } catch(err) {
            console.log("Could Not Read =>", err);
            throw "Could Not Read";
        }
    }

    store(key: string, data: string) {
        try {
            const txn = this.env.beginTxn();
            txn.putString(this.dbi, key, data);
            txn.commit();
        } catch(err) {
            console.log("Error Storing => ", err);
            throw "Could Not Store"
        }
    }
}

let store = new Store();
export default store;