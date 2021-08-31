require('dotenv').config();
const { Pool, Client } = require('pg');
const connectionString = process.env.DB_URL;
const tries = 5;

const pool = new Pool({
    connectionString: connectionString,
});

while (tries > 0) {
    try {
        pool.query("SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'", (err, res) => {
            if (err)
                console.log(err);
            else {
                if (!res.rowCount) {
                    console.log("Database not found");
                    console.log("Creating");

                    pool.query(`CREATE TABLE PROFESSOR (
                                    professorId SERIAL NOT NULL,
                                    name VARCHAR(50) NOT NULL,
                                    
                                    CONSTRAINT PROFESSOR_PK PRIMARY KEY (professorId)
                                );
                                CREATE TABLE ALUNO (
                                    alunoId SERIAL NOT NULL,
                                    name VARCHAR(60) NOT NULL,
                                    
                                    CONSTRAINT ALUNO_PK PRIMARY KEY (alunoId)
                                );
                                CREATE TABLE GRUPO (
                                    grupoId SERIAL NOT NULL,
                                    tema VARCHAR(60) NOT NULL,
                                    nota INT NOT NULL,
                                    
                                    CONSTRAINT GRUPO_PK PRIMARY KEY (grupoId)
                                );
                                CREATE TABLE integra (
                                    alunoId SERIAL NOT NULL,
                                    grupoId SERIAL NOT NULL,
                                    
                                    CONSTRAINT integra_GRUPO_FK FOREIGN KEY (grupoId)
                                        REFERENCES GRUPO (grupoId)  ON DELETE CASCADE ON UPDATE CASCADE,
                                    CONSTRAINT integra_ALUNO_FK FOREIGN KEY (alunoId)
                                        REFERENCES ALUNO (alunoId)  ON DELETE CASCADE ON UPDATE CASCADE
                                );`, (err, res) => {
                        if (err) {
                            console.log("Failed creating Database");
                            console.log(err);
                        } else {
                            console.log('Database \x1b[32mOK\x1b[0m');
                        }
                    });
                }

                else if (res.rowCount != 10)
                    throw '\x1b[33mFaulty database in project\n\x1b[33mDelete dbdata and start project again';

                else
                    console.log('Database \x1b[32mOK\x1b[0m');
            }
        });
        break;
    } catch (err) {
        console.log(err);
        tries--;
    }
}
module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
}
