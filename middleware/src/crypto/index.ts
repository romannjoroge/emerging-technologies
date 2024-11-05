import { NONCE_KEY, PRIVATE_KEY, SALT_KEY } from "../constants";
import store from "../store";
import nacl from "tweetnacl";
import util from "tweetnacl-util";
import scrypt from "scryptsy";

class Encrpyt {
    private privateKey: Uint8Array = new Uint8Array();
    private salt: Uint8Array = new Uint8Array();
    private nonce: Uint8Array = new Uint8Array();
    private N = 16384;
    private r = 8;
    private p = 1;

    constructor() {
        this.init();
    }

    private init() {
        try {
            const key = store.read(PRIVATE_KEY);
            if (!key) {
                const pair = nacl.box.keyPair();
                this.privateKey = pair.secretKey
                store.store(PRIVATE_KEY, pair.secretKey.toString())
            } else {
                this.privateKey = Uint8Array.from(key);
            }

            const salt = store.read(SALT_KEY);
            if (!salt) {
                const newSalt = nacl.randomBytes(16);
                this.salt = newSalt;
                store.store(SALT_KEY, newSalt.toString())
            } else {
                this.salt = Uint8Array.from(salt);
            }

            const nonce = store.read(NONCE_KEY);
            if (!nonce) {
                const newNonce = nacl.randomBytes(nacl.secretbox.nonceLength);
                this.nonce = newNonce;
                store.store(NONCE_KEY, newNonce.toString())
            } else {
                this.nonce = Uint8Array.from(nonce);
            }
        } catch (err) {
            console.log("Error initing encryption stuff =>", err);
            throw "Error Initing Encryption Stuff";
        }
    }

    encrypt(data: string): string {
        let key = scrypt(this.privateKey.toString(), this.salt, this.N, this.r, this.p, nacl.secretbox.keyLength);
        let encrypted = nacl.secretbox(util.decodeUTF8(data), this.nonce, key);
        return util.encodeBase64(encrypted);
    }

    decrypt(data: string): string {
        let encrypted = util.decodeBase64(data);
        let key = scrypt(this.privateKey.toString(), this.salt, this.N, this.r, this.p, nacl.secretbox.keyLength);
        let decrypted = nacl.secretbox.open(encrypted, this.nonce, key);
        if (decrypted) {
            return util.encodeBase64(decrypted);
        } else {
            throw "Could Not Decrypt"
        }
    }
}

let encrypt = new Encrpyt();
(() => {
    let rawData = "Test";
    const encrypted = encrypt.encrypt(rawData);
    console.log("Encrypted =>", encrypted)
    const decrypted = encrypt.decrypt(encrypted);
    console.log("Decrypted => ", decrypted);
})()
