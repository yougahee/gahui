const pool = require("../modules/pool");
const table = "post";

const post = {
  getPostAll: async () => {
    const query = `SELECT * FROM ${table}`;
    try {
      const result = await pool.queryParamArr(query);
      return result;
    } catch (err) {
      if (err.errno == 1062) {
        console.log("getPostAll ERROR : ", err.errno, err.code);
        return -1;
      }
      console.log("getPostAll ERROR : ", err);
      throw err;
    }
  },
  getPostByID: async (id) => {
    const query = `SELECT * FROM ${table} WHERE id = ${id}`;
    try {
      const result = await pool.queryParamArr(query);
      return result;
    } catch (err) {
      if (err.errno == 1062) {
        console.log("getPostByID ERROR : ", err.errno, err.code);
        return -1;
      }
      console.log("getPostByID ERROR : ", err);
      throw err;
    }
  },
  createPost: async (id, content, title) => {
    const fields = "id, content, title";
    const questions = `?, ?, ?`;
    const values = [id, content, title];
    const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;

    try {
      const result = await pool.queryParamArr(query, values);
      const insertId = result.insertId;
      return insertId;
    } catch (err) {
      if (err.errno == 1062) {
        console.log("createPost ERROR : ", err.errno, err.code);
        return -1;
      }
      console.log("createPost ERROR : ", err);
      throw err;
    }
  },
  updatePost: async (id, content, title) => {
    const query = `UPDATE ${table} SET content = "${content}", title = "${title}" WHERE id = ${id}`;

    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      if (err.errno == 1062) {
        console.log("updatePost ERROR : ", err.errno, err.code);
        return -1;
      }
      console.log("updatePost ERROR : ", err);
      throw err;
    }
  },
  deletePost: async (id) => {
    const query = `DELETE FROM ${table} WHERE id = ${id}`;
    try {
      const result = await pool.queryParamArr(query);
      return result;
    } catch (err) {
      if (err.errno == 1062) {
        console.log("deletePost ERROR : ", err.errno, err.code);
        return -1;
      }
      console.log("deletePost ERROR : ", err);
      throw err;
    }
  },
  checkPostId: async (id) => {
    const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
    try {
      const result = await pool.queryParam(query);
      if (result.length === 0) {
        return false;
      } else return true;
    } catch (err) {
      if (err.errno == 1062) {
        console.log("checkPostId ERROR : ", err.errno, err.code);
        return -1;
      }
      console.log("checkPostId ERROR : ", err);
      throw err;
    }
  },
};

module.exports = post;
