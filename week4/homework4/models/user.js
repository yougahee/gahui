const pool = require('../modules/pool');
//const { throw ,} = require('../config/database');
const table = 'user';

const user = {
  signup: async (id, name, password, salt, email) => {
    const fields = 'id, name, password, salt, email';
    //이거 뭐지??????
    const questions = `?, ?, ?, ?, ?`;
    const values = [id, name, password, salt, email];
    const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
    try {
      const result = await pool.queryParamArr(query, values);
      const insertId = result.insertId;
      return insertId;
    } catch (err) {
      if (err.errno == 1062) {
        console.log('signup ERROR : ', err.errno, err.code);
        return -1;
      }
      console.log('signup ERROR : ', err);
      throw err;
    }
  },
  
  //아이디 중복 확인
  checkUser: async (id) => {
    const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
    try {
      const result = await pool.queryParam(query);
      if (result.length === 0) {
        return false;
      } else return true;
    } catch (err) {
      if (err.errno == 1062) {
        console.log('checkUser ERROR : ', err.errno, err.code);
        return -1;
      }
      console.log('checkUser ERROR : ', err);
      throw err;
    }
  },

  //로그인
  signin: async (id) => {

    const query = `SELECT * FROM ${table} Where id = "${id}"`
    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      if (err.errno == 1062) {
        console.log('signup ERROR : ', err.errno, err.code);
        return -1;
      }
      console.log('signup ERROR : ', err);
      throw err;
    }
  },

  getUserById: async (id) => {
    const query = `SELECT * FROM ${table} WHERE useridx = "${id}"`
    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      if (err.errno == 1062) {
        console.log('getUserById ERROR : ', err.errno, err.code);
        return -1;
      }
      console.log('getUserById ERROR : ', err);
      throw err;
    }
  },

  //7th Seminar
  updateProfile: async (userIdx, profile) => {
    let query = `UPDATE ${table} SET image= "${profile}" WHERE id="${userIdx}"`;
    try {
      await pool.queryParam(query);
      query = `SELECT id, name, email, image FROM ${table} WHERE id ="${userIdx}"`;
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      console.log('update profile ERROR : ', err);
      throw err;
    }
  },

  //7th Seminar
  sendImages: async (id) => {
    const query = `SELECT imageurl FROM image WHERE userid = "${id}"`;

    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      if(err.errno == 1062) {
        console.log('sendImages ERROR : ', err.errno, err.code);
        return -1;
      }
      console.log('sendImages ERROR : ', err );
      throw err;
    }
  }

}

module.exports = user;