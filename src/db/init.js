const Database = require('./config');

const initDb = {
    async init(){
        const db = await Database();

        await db.exec(`
            CREATE TABLE IF NOT EXISTS task(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                status TEXT,
                order_task INT
            );
        `);

        await db.run(`
            INSERT INTO task (
                name, 
                status, 
                order_task
            ) VALUES (
                "Levantar",
                "Done",
                0
            );
        `);

        await db.run(`
            INSERT INTO task (
                name, 
                status, 
                order_task
            ) VALUES (
                "Lavar o rosto",
                "Doing",
                1
            );
        `);

        await db.run(`
            INSERT INTO task (
                name, 
                status, 
                order_task
            ) VALUES (
                "Ligar o computador",
                "ToDo",
                2
            );
        `);

        await db.close();
    }
}

initDb.init();