import mysql from 'mysql'

export const connection = mysql.createConnection({
    host: '192.168.100.252',
    user: 'apidev_hpl',
    password: 'ialL2XAXpSklAUZWjBsw',
    database: 'apidev_hpl'
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

// connection.end();