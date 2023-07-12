const env = process.env;
console.log(env.DB_PASSWORD);

const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    multipleStatements: true,
  },
  mail: env.mailbaseURL,
  //listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
