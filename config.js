const env = process.env;
console.log(env.DB_PASSWORD);

const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    url: "mysql -hcontainers-us-west-145.railway.app -uroot -p3Hza6ExvGZymsRi1STXj --port 6387 --protocol=TCP railway",
  },
  mail: env.mailbaseURL,
  //listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
