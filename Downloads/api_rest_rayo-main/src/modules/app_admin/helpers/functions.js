
const { errors, success } = require("../../../core/helpers/constants/messages");
const tables = require("../../../core/helpers/constants/tables");
const { readAllRecord } = require("../../../core/helpers/functions");

module.exports = {


    validatePermissionAdmin: async (id_user, connection) => {
        return new Promise(async function (resolve, reject) {

            const user = await readAllRecord(`SELECT * FROM ${tables.tables.Admins} WHERE id_user = "${id_user}"`, connection)
            if (user[0]) {
                resolve([true, success.permissions, user])
            } else {
                resolve([false, errors.permissions, id_user]);
            }
        });
    },

};
