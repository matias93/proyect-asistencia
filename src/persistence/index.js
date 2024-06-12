import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mydb.db");

export const initSQLiteDB = () => {
    console.log("Will create table");
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);",
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
    console.log("will return promise");
    return promise;
};

export const insertSession = ({ email, token }) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO sessions (email, token) VALUES (?, ?);',
                [email, token],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
    return promise;
};

export const getSession = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * from sessions',
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
    return promise;
};

export const truncateSessionsTable = () => {
    console.log("Will truncate table")
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM sessions",
                [], //Parameters
                (_, result) => resolve(result), 
                (_, error) => reject(error) 
            )
        })
    })
    console.log("will return promise")
    return promise
}