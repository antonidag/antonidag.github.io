const { Pool } = require('pg')
const config = {
  user: "kbjxjfvmqyquqi",
  password: "1d01b8f2c5372cbbb2b681b0f3def6a9aff2d20ff969bda5ff8346a47538f898",
  database: "dffdk5hhk8l6v1",
  port: 5432,
  host: "ec2-54-246-89-234.eu-west-1.compute.amazonaws.com",
  ssl: true
};
const pool = new Pool(config);

async function getAllUsers(){
    const client = await pool.connect();
    const result = await client.query({
      rowMode: 'json',
      text: "select id, nickname from users",
    });
    await client.end();
    return result.rows;
}

async function insertUser( nickname, password ){
  const client = await pool.connect();
  const result = await client.query("insert into users(nickname,password) values ('" + nickname + "','" + password + "')");
  await client.end();
  return result.rowCount;
}

async function getUser(nickname,password){
  const client = await pool.connect();
  const result = await client.query({
    rowMode: 'json',
    text: "select * from users where nickname = '"  + nickname + "' and password = '" + password + "'",
  });

  await client.end();
  return result.rows;
}

async function updateUserImage(nickname,url){
  const client = await pool.connect();
  const result = await client.query({
    rowMode: 'json',
    text: "update users set profileurl = '" + url  + "' where nickname = '" + nickname + "'",
  });

  await client.end();
  return result.rowCount;
}

module.exports.getAllUsers = function() {
    return getAllUsers();
}

module.exports.insertUser = function ( nickname,password ) {
  return insertUser(nickname,password);
}

module.exports.getUser = function ( nickname,password ) {
  return getUser(nickname,password);
}

module.exports.updateUserImage = function ( nickname,url ){
  return updateUserImage(nickname,url);
}