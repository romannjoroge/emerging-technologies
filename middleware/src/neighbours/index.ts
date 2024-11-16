import { UPDATE_ENDPOINT } from "../constants";
import database from "../database";
import { InitSchema, UpdateNeighbour } from "../types";



export default class Neighbour {
    static setupNeighbours(neighbours: InitSchema['neighbours']) {
        try {
            // Store neighbours as well somewhere
            neighbours.forEach((ne) => {
                database.storeNeighbour(ne.name, ne.address);
            })
        } catch(err) {
            console.log("Error Setting Up Neighbours => ", err);
            throw "Could Not Set Up Neighbours";
        }
    }

    private static async updateNeighbour(url: string, args: UpdateNeighbour) {
        try {
            let res = await fetch(`${url}/${UPDATE_ENDPOINT}`, {
                method: "POST",
                body: JSON.stringify(args)
            });

            if (res.status !== 201) {
                console.log("Error from neighbour",res.body)
                throw "Error Updating Neighbour"
            }
        } catch(err) {
            console.log("Error Updating Neighbour =>", err);
            throw "Could Not Update Neighbour";
        }
    }

    static async updateNeighbours(args: UpdateNeighbour) {
        // Get neigbours
        let neighbours = await database.getNeighbours();

        neighbours.forEach((n) => {
            this.updateNeighbour(n.address, args);
        })
    }
}