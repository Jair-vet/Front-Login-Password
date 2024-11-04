
const pool = require("../../../../core/database/config");
const constants = require("../../../../core/helpers/constants/constants");
const { errors } = require("../../../../core/helpers/constants/messages");
const tables = require("../../../../core/helpers/constants/tables");
const { createRecord, readAllRecord } = require("../../../../core/helpers/functions");
const bcrypt = require("bcrypt");
const { validatePermissionAdmin } = require("../../helpers/functions");



module.exports = {

    addDrivers: async (req, res) => {
        try {
            const { name, email, password, birthdate, brand, model, year } = req.body;
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
                        `SELECT *  FROM ${tables.tables.Users} WHERE email = '${email}'`,
                        connection, false
                    );
                    if (response[2].length == 0) {
                        const salt = bcrypt.genSaltSync();
                        const user = {
                            email,
                            password,

                        };
                        user.password = bcrypt.hashSync(password, salt);
                        response = await createRecord(user, tables.tables.Users, connection);
                        if (response[0]) {
                            response = await createRecord({ name, id_user: response[2], birthdate }, tables.tables.Drivers, connection)
                            if (response[0]) {
                                const taxi = await createRecord({ brand, model, year }, tables.tables.Taxis, connection)

                            }
                        }
                    } else {
                        response[1] = errors.emailAlredy
                    }
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

    getDrivers: async (req, res) => {
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
                        `SELECT  ${tables.tables.Drivers}.*, ${tables.tables.Users}.email as email   FROM ${tables.tables.Drivers} INNER JOIN ${tables.tables.Users} ON ${tables.tables.Users}.id = ${tables.tables.Drivers}.id_user WHERE ${tables.tables.Users}.id_company = '${id_company}'`, connection, false
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
