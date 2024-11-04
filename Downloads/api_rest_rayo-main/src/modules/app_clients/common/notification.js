
const { errors, success } = require("../../../core/helpers/constants/messages");
const notification = require("../../app_drivers/common/notification");
const appDriver = require("./firebase-config");


module.exports = {


  sendNotification: async (tokens, title, body, id) => {
    return new Promise(async function (resolve, reject) {
      console.log(tokens)
      try {
        const message = {
          tokens: tokens, // Aquí va el array de tokens
          notification: {
            title: title,
            body: body,

          },
          data: {
            travel: id.toString() // Puedes enviar otros datos en el campo data
          },
        };


        appDriver.messaging().sendEachForMulticast(message).then((response) => {
          console.log(response.responses)
          resolve([true, success.sendNotification, id])
        })
          .catch((error) => {
            console.error('Error sending multicast notification:', error);
            resolve([false, errors.errorNotifyDrivers, id])
          });
      } catch (error) {
        console.log(error)
        resolve([false, errors.errorNotifyDrivers, id])
      }
    })
  },


};
