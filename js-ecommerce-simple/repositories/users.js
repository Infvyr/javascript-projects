const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
    // creates a user with the given attributes
    async create(attrs) {
        // attrs === { email: '', password: '' }
        attrs.id = this.randomId();

        const salt = crypto.randomBytes(8).toString("hex");
        const buf = await scrypt(attrs.password, salt, 64);

        // { email: 'abcdefgh@abc.com', password: '1123456' }
        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buf.toString("hex")}.${salt}`,
        };
        records.push(record);
        // write the updated 'records' array back to this.filename
        await this.writeAll(records);

        return record;
    }

    async comparePasswords(saved, supplied) {
        // saved = password saved in our database. 'hashed.salt'
        // supplied = password given to us by a user trying sign in
        // const result = saved.split(".");
        // const hashed = result[0];
        // const salt = result[1];
        const [hashed, salt] = saved.split(".");
        const hashedSuppliedBuffer = await scrypt(supplied, salt, 64);

        return hashed === hashedSuppliedBuffer.toString("hex");
    }
}

module.exports = new UsersRepository("users.json");
