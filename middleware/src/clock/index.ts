import { CLIENT_NAME, MIDDLEWARE_CLOCK } from "../constants";
import store from "../store";

export default class Clock {
    static setupClock(clientName: string, neighbourClock: Record<string, any>) {
        try {
            neighbourClock[clientName] = 0;

            // Store the current vector clock key somewhere
            store.store(MIDDLEWARE_CLOCK, JSON.stringify(neighbourClock));
            store.store(CLIENT_NAME, clientName);
        } catch(err) {
            console.log("Error Setting Up Clock =>", err);
            throw "Error Setting Up Clock";
        }
    }

    static getClock(): Record<string, any> {
        try {
            // Get clock from store
            const rawClock = store.read(MIDDLEWARE_CLOCK);

            if(rawClock) {
                return JSON.parse(rawClock);
            } else {
                throw "Clock Not Stored Yet";
            }
        } catch(err) {
            console.log("Could Not Get Clock =>", err);
            throw "Could Not Get Clock";
        }
    }

    static isOwnClockAhead(other: Record<string, number>): boolean {
        try {
            let ownClock = this.getClock();
            for (let key of Object.keys(other)) {
                if (other[key] > ownClock[key]) {
                    return false;
                }
            }
        
            return true;
        } catch(err) {
            console.log("Error Checking if clock is ahead => ", err);
            throw "Error Checking if clock is ahead";
        }
    }

    static updateClock(other: Record<string, number>){
        try {
            let ownClock = this.getClock();
            // Compare each pair in other
            for (let key of Object.keys(other)) {
                // If any has a greater value than own update own with 1 plus other
                if (other[key] > ownClock[key]) {
                    ownClock[key] = other[key] + 1;
                }
            }
        
            store.store(MIDDLEWARE_CLOCK, ownClock.toString())
        } catch(err) {
            console.log("Error Updating Clock =>", err);
            throw "Error Updating Clock";
        }
    }

    static incrementClock() {
        try {
            let clock = this.getClock();
            let client_name = store.read(CLIENT_NAME);

            if (client_name) {
                clock[client_name] += 1;
                store.store(MIDDLEWARE_CLOCK, JSON.stringify(clock));
            } else {
                throw "Could Not Get Client name";
            }
        } catch(err) {
            console.log("Error Incrementing clock =>", err);
            throw "Could Not Increment Clock"
        }
    }
}