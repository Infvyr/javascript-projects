const fs = require("fs");
const crypto = require("crypto");

/*
* Implements Repository Logical

getAll - gets a list of all users, products
    - returns user, product
getOne - finds the user, product with the given Id
    - gets id
    - returns user, product
getOneBy - finds one user, product with the given filters
    - gets filters
    - returns user, product
create - creates a user, product with the given attributes
    - gets attributes
    - returns null
update - updates the user, product with the given id using the given attributes
    - gets id, attributes
    - returns null
delete - delete the user, product with the given id
    - gets id
    - returns null
randomId = generates a random ID
    - return id
writeAll - writes all users to a users.json file
    - returns null
*/

module.exports = class Repository {
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

    async create(attrs) {
        attrs.id = this.randomId();

        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records);

        return attrs;
    }

    // gets a list of all users, products, whatever it's passed
    async getAll() {
        // Open the file called this.filename
        return JSON.parse(
            await fs.promises.readFile(this.filename, {
                encoding: "utf8",
            }),
        );
    }

    // writes all users, products, whatever it's passed to a users.json file
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

    // finds the user, products, whatever it's passed with the given Id
    async getOne(id) {
        const records = await this.getAll();
        return records.find((record) => record.id === id);
    }

    // delete the user, products, whatever it's passed with the given id
    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter((record) => record.id !== id);
        await this.writeAll(filteredRecords);
    }

    // updates the user, products, whatever it's passed with the given id using the given attributes
    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find((record) => record.id === id);

        if (!record) throw new Error(`Record with id ${id} not found!`);

        // record === { email: 'email@mail.test' }
        // attr === { password: '1234' }
        Object.assign(record, attrs); // record === { email: 'email@mail.test', password: '1234'}

        await this.writeAll(records);
    }

    // finds one user, products, whatever it's passed with the given filters
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
};
