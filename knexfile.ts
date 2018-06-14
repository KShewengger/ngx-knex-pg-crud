module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      database: "knex_crud",
      user: null,
      password: null
    },
    migrations: {
      extensions: [ "ts" ]
    },
    debug: true
  }
};