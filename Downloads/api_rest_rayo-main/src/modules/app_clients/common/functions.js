const tables = require("../../../core/helpers/constants/tables");
const constants = require("../../../core/helpers/constants/constants");
const {
    errors,
    success,
} = require("../../../core/helpers/constants/messages");
const { readRecord, updateRecord, uploadFile, readAllRecord } = require("../../../core/helpers/functions");
const { sendNotification } = require("./notification");



module.exports = {
    notifyNewTravel: async (id, connection) => {
        return new Promise(async function (resolve, reject) {
            try {
                const drivers = await readAllRecord(`SELECT ${tables.tables.Drivers}.id_device as token FROM ${tables.tables.Drivers} WHERE ${tables.tables.Drivers}.id_device <> ''`, connection)
                const travel = await readRecord(tables.tables.Travels, id, connection)
                if (drivers[0] && travel[0]) {
                    console.log(drivers)
                    const tokens = drivers[2].map(row => row.token);
                    await sendNotification(tokens, 'Nuevo viaje!!', 'Hay un viaje nuevo da click para ver más detalles', id)
                    resolve([true, success.notify, id])
                }
            } catch (error) {
                console.log(error);
                resolve([false, errors.errorNotifyDrivers, '']);
            }
        });
    },

    uploadFilesByPhotoProfile: async (files, user, connection) => {
        return new Promise(async function (resolve, reject) {
            try {
                console.log(user)
                let path_photo = user.path_photo;
                let response = 0;
                console.log(files, files['photo_profile'])
                if (files != null) {
                    if (files["photo_profile"]) {
                        response = await uploadFile(
                            files["photo_profile"],
                            "Photos",
                            user.id,
                            `https://nyc3.digitaloceanspaces.com/sgp-web/${constants.SERVER_FILES}/${user.id_company}/`,
                            user.email
                        );
                        if (response[0]) {
                            path_photo = response[2];
                        }
                    }
                    response = await updateRecord(
                        { path_photo },
                        tables.tables.Users,
                        user.id,
                        connection
                    );
                    if (response[0]) {
                        resolve([true, success.successUpdate, path_photo]);
                    } else {
                        resolve([false, errors.errorUploadFile, path_photo]);
                    }
                } else {
                    resolve([true, success.successUpdate, path_photo]);
                }
            } catch (error) {
                console.log(error);
                resolve([false, errors.errorUploadFile, '']);
            }
        });
    },



};
