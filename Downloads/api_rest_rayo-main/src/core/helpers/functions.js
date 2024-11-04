
const { errors, success } = require("../helpers/constants/messages");
const constants = require("../helpers/constants/constants");
const axios = require("axios");
const FormData = require("form-data");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
  getCurrentDate() {
    moment.tz.setDefault(constants.TIME_ZONE);
    let currentTime = moment().format();
    currentTime = currentTime.replace("T", " ");
    currentTime = currentTime.slice(0, 19);
    return currentTime;
  },

  formatToSaveDate(date) {
    const [day, month, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  },
  formatToRetrieveDate(date) {
    const [year, month, day] = date.split('-');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  },
  validatePassword: async (user, password) => {
    return new Promise(function (resolve, reject) {

      const validatePassword = bcrypt.compareSync(password, user.password);
      console.log(validatePassword)
      if (validatePassword) {
        resolve([true, success.password, user])
      } else {
        resolve([false, errors.password, 0]);

      }
    });
  },

  generateJWT: (id_user, id_company) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id_user,
        id_company
      };

      jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
        if (err) {
          reject("NO SE PUDO GENERAR TOKEN");
        } else {
          resolve(token);
        }
      });
    });
  },



  uploadFile: async (file, type, folder, server, name) => {
    return new Promise(async function (resolve, reject) {

      const fileBuffer = Buffer.from(file.data);
      const formData = new FormData();
      formData.append("file", fileBuffer, {
        filename: name,
        contentType: file.mimetype,
      });
      formData.append("bucket_name", type);
      formData.append("folder_name", folder);
      formData.append("endpoint_path", server);
      formData.append("with_replace", "false");
      try {
        const response = await axios.post(
          "https://www.binteapi.com:8080/api/submit/endpoint-dynamic/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Token a7143f2e369e24e9ec084081de3f0927b4ea77a0",
            },
          }
        );
        resolve([true, success.file, response.data]);
      } catch (error) {
        console.log("Error al enviar los datos: ", error.message);
        resolve([false, errors.file, []]);
      }
    });
  },

  // readPDF: async (path_pdf) => {
  //   return new Promise(async function (resolve, reject) {
  //     try {
  //       console.log(path_pdf);
  //       const dataPDF = await fetch(path_pdf);
  //       const filePDF = Buffer.from(await dataPDF.arrayBuffer()).toString(
  //         "base64"
  //       );
  //       resolve([true, success.pdf, filePDF]);
  //     } catch (error) {
  //       console.log(error);
  //       resolve([false, errors.pdf, 0]);
  //     }

  //   });
  // },

  createRecord: async (object, table, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} SET ?`;
      connection.query(query, [object], async (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.dataBase, 0]);
        } else {
          if (results.affectedRows > 0) {
            resolve([true, success.create, results.insertId]);
          } else {
            resolve([false, errors.create, 0]);
          }
        }
      });
    });
  },



  readRecord: async (table, id, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM ${table} WHERE id = ${id}`;
      console.log(query);
      connection.query(query, async (error, results) => {
        if (error) {
          resolve([false, errors.dataBase, 0]);
        } else {
          if (results.length > 0) {
            resolve([true, success.read, results[0]]);
          } else {
            resolve([false, errors.read, 0]);
          }
        }
      });
    });
  },

  readAllRecord: async (query, connection, errorMsg = false) => {
    return new Promise(function (resolve, reject) {
      connection.query(query, async (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.dataBase, []]);
        } else {
          if (results.length > 0) {
            resolve([true, success.read, results]);
          } else {
            console.log(results, errorMsg)
            if (errorMsg) {
              resolve([false, errors.notFound, []]);
            } else {
              resolve([true, success.read, []]);
            }

          }
        }
      });
    });
  },

  updateRecord: async (object, table, id, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `UPDATE  ${table} SET ? WHERE id = ${id}`;
      connection.query(query, [object], async (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.dataBase, 0]);
        } else {
          if (results.affectedRows > 0) {

            resolve([true, success.update, id]);
          } else {
            resolve([false, errors.update, 0]);
          }
        }
      });
    });
  },

  deleteRecord: async (table, id, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `DELETE FROM  ${table}  WHERE id = ${id}`;
      connection.query(query, async (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.dataBase, 0]);
        } else {
          if (results.affectedRows > 0) {
            resolve([true, success.delete, id]);
          } else {
            resolve([false, errors.delete, 0]);
          }
        }
      });
    });
  },

  updateRecords: async (object, table, condition, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `UPDATE  ${table} SET ? WHERE ${condition}`;

      connection.query(query, [object], async (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.dataBase, 0]);
        } else {
          if (results.affectedRows > 0) {
            resolve([true, success.update, object]);
          } else {
            resolve([false, errors.update, 0]);
          }
        }
      });
    });
  },
};
