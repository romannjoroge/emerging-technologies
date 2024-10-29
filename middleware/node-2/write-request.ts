import fs from "fs";
import os from "os";

export default function writeToFile(text: string) {
    try {
        fs.appendFileSync('./storage.txt', `${text}${os.EOL}`);
    } catch(err) {
        console.log("Error Writing to file => ", err);
        throw new Error("Error Writing File");
    }    
}
