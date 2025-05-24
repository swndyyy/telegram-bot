const fs = require("node:fs");
const path = require("node:path");

class Database {
    #data;
    constructor(filename) {
        this.databaseFile = path.join(".", filename);
        this.#data = {};
    }
    default = () => {
        return {
            user: {},
            group: {},
            settings: {
                self: false,
                online: true,
                anticall: false,
                autotyping: false,
                autorecording: false,
                autoread: false,
                autobio: false,
                autolevelup: true,
                blockcmd: [],
                max_upload: "50MB",
                resetlimit: "02:00",
            },
        };
    };
    init = async () => {
        const data = await this.read();
        this.#data = {
            ...this.#data,
            ...data
        };
        return this.#data;
    };
    read = async () => {
        if (fs.existsSync(this.databaseFile)) {
            const data = fs.readFileSync(this.databaseFile);
            return JSON.parse(data);
        } else {
            return this.default();
        }
    };

    save = async () => {
        const jsonData = JSON.stringify(this.#data, null, 2);
        fs.writeFileSync(this.databaseFile, jsonData);
    };
    add = async (type, id, newData) => {
        if (!this.#data[type]) return `- Tipe data ${type} tidak ditemukan!`;
        if (!this.#data[type][id]) {
            this.#data[type][id] = newData;
        }
        await this.save();
        return this.#data[type][id];
    };

    delete = async (type, id) => {
        if (this.#data[type] && this.#data[type][id]) {
            delete this.#data[type][id];
            await this.save();
            return `- ${type} dengan ID ${id} telah dihapus.`;
        } else {
            return `- ${type} dengan ID ${id} tidak ditemukan!`;
        }
    };
    get = (type, id) => {
        if (this.#data[type] && this.#data[type][id]) {
            return this.#data[type][id];
        } else {
            return `- ${type} dengan ID ${id} tidak ditemukan!`;
        }
    };
    main = async (m) => {
        await this.read();
        if (m?.isGroup) {
            await this.add("group", ctx.chatId, {
                message: 0,
            });
        }
        await this.add("user", ctx.senderId, {
            name: ctx.username,
            limit: 100,
            register: false,
            premium: {
                status: false,
                expired: 0,
            },
            banned: {
                status: false,
                expired: 0,
            },
        });
        await this.save();
        return this.list();
    };
    list = () => {
        return this.#data;
    };
}

module.exports = Database;