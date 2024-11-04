
const pool = require("../../../../core/database/config");
const constants = require("../../../../core/helpers/constants/constants");
const { errors } = require("../../../../core/helpers/constants/messages");
const tables = require("../../../../core/helpers/constants/tables");
const { createRecord, readAllRecord } = require("../../../../core/helpers/functions");
const bcrypt = require("bcrypt");
const { validatePermissionAdmin } = require("../../helpers/functions");



module.exports = {

    getTravels: async (req, res) => {
        try {
            const id_company = req.id_company;
            const id_user = req.id_user
            let response = 0;
            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }
                response = await validatePermissionAdmin(id_user, connection)
                if (response[0]) {
                    response = await readAllRecord(
                        `SELECT ${tables.tables.Travels}.*, ${tables.tables.Clients}.name as client, ${tables.tables.StatusTravels}.name as status FROM ${tables.tables.Travels} INNER JOIN ${tables.tables.Clients} ON ${tables.tables.Clients}.id = ${tables.tables.Travels}.id_client INNER JOIN ${tables.tables.StatusTravels} ON ${tables.tables.StatusTravels}.id = ${tables.tables.Travels}.id_status WHERE ${tables.tables.Travels}.id_company = '${id_company}'   ORDER BY ${tables.tables.Travels}.date DESC`, connection, false
                    );
                }
                connection.release();
                myConnection.end();
                return res.status(response[1].code).json({
                    ok: response[0],
                    message: response[1].message,
                    data: response[2],
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(errors.server.code).json({
                ok: false,
                message: errors.server.message,
            });
        }
    },

};
