"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3 = require('sqlite3').verbose();
exports.db = new sqlite3.Database(`${process.env.DATABASE_URL}`);
exports.db.serialize(() => {
    exports.db.run('CREATE TABLE IF NOT EXISTS dogs (id TEXT PRIMARY KEY)', (err) => {
        if (err) {
            console.error('Error creatng table', err);
        }
        else {
            console.log('Dogs table created successfully');
        }
    });
});
