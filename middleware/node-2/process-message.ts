import { isOwnClockAhead, updateClock } from "./clock";
import writeToFile from "./write-request";

type RequestType = "UPDATE" | "INSERT" | "DELETE";

let ownClock = {"1": 0, "2": 1};

export default async function processMessage(requestType: RequestType, args: string[], clock: Record<string, number>) {
    try {
        // Check if own clock is ahead
        let isAhead = isOwnClockAhead(ownClock, clock);

        // If so ignore
        if(isAhead) {
            console.log("Node is Ahead No Need to do anything!");
        } else {
            // Otherwise perform operation
            writeToFile(args[0]);
            console.log("Operation Performed!", requestType, args)

            // Update clock
            let newClock = updateClock({...ownClock}, clock);
            console.log("Own clock was => ", ownClock, "Other clock was =>", clock, "New Clock is => ", newClock);
        }
    } catch(err) {
        console.log("Could Not Process Message", err);
    }
}
