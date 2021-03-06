import path from 'path';

module.exports = {
    client: 'mysql2',
    
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'bus'
    },

    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault:true
}