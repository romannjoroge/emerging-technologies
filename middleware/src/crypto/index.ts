import crypto from "crypto";
import fs from "fs";
import { PRIVATE_KEY_FILE, PUBLIC_KEY_FILE } from "../constants";

class Encrypt {
    private privateKey: string
    private publicKey: string

    constructor() {
        // Check if private and public keys already exist
        if (!fs.existsSync(PRIVATE_KEY_FILE) || !fs.existsSync(PUBLIC_KEY_FILE)) {
            // Create key
            const keyPair = crypto.generateKeyPairSync("rsa", {
                modulusLength: 4096, // bits - standard for RSA keys
                publicKeyEncoding: {
                    type: "pkcs1", // "Public Key Cryptography Standards 1"
                    format: "pem", // Most common formatting choice
                },
                privateKeyEncoding: {
                    type: "pkcs1", // "Public Key Cryptography Standards 1"
                    format: "pem", // Most common formatting choice
                },
            });

            // Create the public key file
            fs.writeFileSync(PUBLIC_KEY_FILE, keyPair.publicKey);

            // Create the private key file
            fs.writeFileSync(PRIVATE_KEY_FILE, keyPair.privateKey);

            // Load key
            this.privateKey = keyPair.privateKey;
            this.publicKey = keyPair.publicKey;
        } else {
            // Load keys
            this.publicKey = fs.readFileSync(PUBLIC_KEY_FILE, "utf-8");
            this.privateKey = fs.readFileSync(PRIVATE_KEY_FILE, "utf-8");
        }
    }

    encrypt(text: string): Buffer {
        try {
            const bufferMessage = Buffer.from(text, "utf-8");
            let encrypted = crypto.publicEncrypt(this.publicKey, bufferMessage);
            return encrypted;
        } catch(err) {
            console.log("Error Encrypting =>", err);
            throw "Could Not Encrypt";
        }
    }

    decrypt(buffer: Buffer): string {
        try {
            let decryped = crypto.privateDecrypt(this.privateKey, buffer);
            return decryped.toString();
        } catch(err) {
            console.log("Error Decrypting =>", err);
            throw "Could Not Decrypt";
        }
    }
}

let encrypt = new Encrypt();
export default encrypt;