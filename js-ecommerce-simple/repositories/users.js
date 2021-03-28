const fs = require("fs");
const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

/*
* Implements Users Logical

getAll - gets a list of all users
    - returns user
getOne - finds the user with the given Id
    - gets id
    - returns user
getOneBy - finds one user with the given filters
    - gets filters
    - returns user
create - creates a user with the given attributes
    - gets attributes
    - returns null
update - updates the user with the given id using the given attributes
    - gets id, attributes
    - returns null
delete - delete the user with the given id
    - gets id
    - returns null
randomId = generates a random ID
    - return id
writeAll - writes all users to a users.json file
    - returns null
*/
class UsersRepository {
    constructor(filename) {
        if (!filename)
            throw new Error("Creating a repository requires a filename");
        this.filename = filename;

        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, "[]");
        }
    }

    // gets a list of all users
    async getAll() {
        // Open the file called this.filename
        return JSON.parse(
            await fs.promises.readFile(this.filename, {
                encoding: "utf8",
            }),
        );
    }

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

    // writes all users to a users.json file
    async writeAll(records) {
        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(records, null, 2),
        );
    }

    // generates a random ID
    randomId() {
        return crypto.randomBytes(4).toString("hex");
    }

    // finds the user with the given Id
    async getOne(id) {
        const records = await this.getAll();
        return records.find((record) => record.id === id);
    }

    // delete the user with the given id
    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter((record) => record.id !== id);
        await this.writeAll(filteredRecords);
    }

    // updates the user with the given id using the given attributes
    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find((record) => record.id === id);

        if (!record) throw new Error(`Record with id ${id} not found!`);

        // record === { email: 'email@mail.test' }
        // attr === { password: '1234' }
        Object.assign(record, attrs); // record === { email: 'email@mail.test', password: '1234'}

        await this.writeAll(records);
    }

    // finds one user with the given filters
    async getOneBy(filters) {
        const records = await this.getAll();

        for (let record of records) {
            let found = true;

            for (let key in filters) {
                if (record[key] !== filters[key]) found = false;
            }

            if (found) return record;
        }
    }
}

module.exports = new UsersRepository("users.json");
