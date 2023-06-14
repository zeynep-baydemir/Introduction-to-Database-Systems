import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'homework',
    password: 'postgres',
    port: 5432, // Default PostgreSQL port
  });

  export function runQuery(query, response) {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) {
          console.error('Error connecting to the database:', err);
          release();
          reject(err);
          return;
        }
        
        console.log('Connected to the database');
        
        client.query(query, (err, result) => {
          release(); // Release the client back to the pool
      
          if (err) {
            console.error('Error executing query:', err);
            reject(err);
            return;
          }
          
          if (result) {
            console.log(result.rows);
            resolve(result.rows);
          } else {
            resolve([]);
          }
        });
      });
    });
  }


  


