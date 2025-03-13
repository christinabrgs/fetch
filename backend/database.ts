const sqlite3 = require('sqlite3').verbose()
export const db = new sqlite3.Database('./dogs.db')


db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS dogs (id TEXT PRIMARY KEY)', (err: Error) => {
        if(err) {
            console.error('Error creatng table', err)
        } else {
            console.log('Dogs table created successfully')
        }
    })
})


