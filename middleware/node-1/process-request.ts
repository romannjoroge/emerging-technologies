import writeToFile from "./write-request";

type RequestType = "UPDATE" | "INSERT" | "DELETE";

export default async function processRequest(requestType: RequestType, args: string[], clock: Record<string, number>) {
    try {
        writeToFile(args[0]);
        clock['1'] = clock['1'] + 1;
        // Make a request to neighbour
        const res = await fetch("http://localhost:7000/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                requestType: requestType,
                args,
                clock
            })
        })
        console.log(res.status, res.body);
    } catch(err) {
        console.log("Error Processing Request ", err);
    }
}

async function test() {
    try {
        processRequest("UPDATE", ["Fair Enough"], {"1": 0, "2": 0});
    } catch(err) {
        console.log("Error Processing Request =>", err);
    }
}
test();
