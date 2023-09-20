const mysql = require("mysql2/promise");

async function run() {
  try {
    // const connection = await mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "Heart/zaa007",
    //   database: "cc_15_todo_list",
    // });

    // console.log("DATABASE connected");
    // const result = await connection.query("SELECT * FROM user"); // [el1,el2]
    // console.log("length: ", result.length);
    // console.log("data: ", result[0]); // [{ id: 1, username: 'john',password: 'bbbbbb',email: 'john@gmail.com'},{},{}]
    // console.log("description: ", result[1]);

    // await connection.query(
    //   'INSERT INTO todo_list(title,completed,user_id) VALUES("dinner",false,1)'
    // );

    // const result = await connection.query(
    //   "SELECT t.id todo_id,t.title,t.completed,t.due_date,t.user_id,u.id uid,u.username,u.password,u.email FROM todo_list t LEFT JOIN user u ON t.user_id=u.id "
    // );

    // const result = await connection.query(
    //   'INSERT INTO user (username,email,password) VALUES ("kim","k@gmail.com","123456")'
    // );

    // const result = await connection.query(
    //   'INSERT INTO user (username,email,password) VALUES ("ann","a@gmail.com","123456"),("michael","m@gmail.com","123456")'
    // );

    // const result = await connection.query('UPDATE user SET password="654321"');

    // const result = await connection.query("DELETE FROM user WHERE id>=8");\

    // ##########
    // result CREATE,UPDATE,DELETE : [{},undefined ]
    // result READ : [ [],[] ]

    // const result = await connection.query("SELECT COUNT(*) FROM user ");
    // console.log(result);

    const pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "Heart/zaa007",
      database: "cc_15_todo_list",
      connectionLimit: 10,
    });

    // const result = await pool.query("SELECT * FROM user");
    // console.log(result);

    const username = "john";
    const password = "654321";

    //SELECT * FROM user WHERE username='john' AND password = '654321'
    // const sql =
    //   'SELECT * FROM user WHERE username = "' +
    //   username +
    //   '" AND password = "' +
    //   password +
    //   '"';
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    const result = await pool.query(sql, [username, password]);
    console.log(result);
    console.log(sql);
  } catch (error) {
    console.log(error);
  }
}
// #### .then ####
// mysql
//   .createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Heart/zaa007",
//     database: "cc_15_todo_list",
//   })
//   .then((connection) => {
//     console.log("DB conected");
//     connection
//       .query("select * FROM user")
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => console.log(err));

// LAB01

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Heart/zaa007",
  database: "mysql_todo_list",
  connectionLimit: 10,
});

// CREATE
async function createUser(username, password) {
  try {
    const insert = "INSERT INTO users (username,password) VALUES (?,?)";
    const getUser = await pool.query(insert, [username, password]);
    console.log(getUser);
  } catch (error) {
    console.log(error);
  }
}

async function createTodo(title, completed, userId) {
  try {
    const insert =
      "INSERT INTO todos (title, completed,user_id) VALUES (?,?,?)";
    const getTodo = await pool.query(insert, [title, completed, userId]);
  } catch (error) {
    console.log(error);
  }
}

// UPDATE
async function updateUser(password, id) {
  try {
    const update = "UPDATE users SET password=? WHERE id =?";
    const UpdateUser = await pool.query(update, [password, id]);
  } catch (error) {
    console.log(error);
  }
}

async function updateTodo(title, completed, userId) {
  try {
    const update = "UPDATE todos SET title=?,completed=? WHERE user_id =?";
    const updateTodo = await pool.query(update, [title, completed, userId]);
  } catch (error) {
    console.log(error);
  }
}

// DELETE

async function deleteRow(table, id) {
  try {
    const del = "DELETE FROM " + table + " WHERE id =?";
    const getUser = await pool.query(del, [id]);
    console.log(getUser);
  } catch (error) {
    console.log(error);
  }
}

// SEARCH
async function search(table, id) {
  try {
    const sql = "SELECT * FROM " + table + " WHERE id = " + id;
    const searchId = await pool.query(sql);
    console.log(searchId[0]);
    console.log(sql);
  } catch (error) {
    console.log(error);
  }
}

// GETDATA
async function getDatabase(table) {
  try {
    const sql = "SELECT * FROM " + table;
    const result = await pool.query(sql);
    console.log(result[0]);
    console.log(sql);
  } catch (error) {
    console.log(error);
  }
}

// createUser("heart", "555555");
// createTodo("run", "0", "13");
// updateUser("heartzzz", "234123", 7);
// updateTodo("run", 1, 1, 1);
// deleteUser(7);
// deleteTodo(1);
// deleteRow("todos", 6);
// getDatabase("todos");
// search("todos", 3);
