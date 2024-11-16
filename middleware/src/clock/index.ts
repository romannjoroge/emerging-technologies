import { MIDDLEWARE_CLOCK } from "../constants";
import store from "../store";

export default class Clock {
    getClock(): Record<string, any> {
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

    isOwnClockAhead(other: Record<string, number>): boolean {
        let ownClock = this.getClock();
        for (let key of Object.keys(other)) {
            if (other[key] > ownClock[key]) {
                return false;
            }
        }
    
        return true;
    }

    updateClock(other: Record<string, number>){
        let ownClock = this.getClock();
        // Compare each pair in other
        for (let key of Object.keys(other)) {
            // If any has a greater value than own update own with 1 plus other
            if (other[key] > ownClock[key]) {
                ownClock[key] = other[key] + 1;
            }
        }
    
        store.store(MIDDLEWARE_CLOCK, ownClock.toString())
    }
}