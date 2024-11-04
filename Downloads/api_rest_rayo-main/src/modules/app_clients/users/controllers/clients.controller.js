const constants = require("../../../../core/helpers/constants/constants");
const pool = require("../../../../core/database/config");
const { errors } = require("../../../../core/helpers/constants/messages");
const tables = require("../../../../core/helpers/constants/tables");
const { createRecord, readAllRecord, updateRecord, readRecord, updateRecords, validatePassword, formatToSaveDate } = require("../../../../core/helpers/functions");
const bcrypt = require("bcrypt");
const { uploadFilesByPhotoProfile } = require("../../common/functions");



module.exports = {

    addClient: async (req, res) => {
        try {
            const { name, email, password, birthdate } = req.body;
            let response = 0;
            const birthdateFormat = formatToSaveDate(birthdate)
            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }

                response = await readAllRecord(
                    `SELECT *  FROM ${tables.tables.Users} WHERE email = '${email}'`,
                    connection
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
                        response = await createRecord({ name, birthdate: birthdateFormat, id_user: response[2] }, tables.tables.Clients, connection)
                    }
                } else {
                    response[1] = errors.emailAlredy
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

    editClient: async (req, res) => {
        try {
            const { name, new_password, birthdate, current_password } = req.body;
            console.log(name, new_password, birthdate, current_password, req.id_user, req.body)
            const id_user = req.id_user
            let response = 0;
            let isSamePassword = [true]
            const birthdateFormat = formatToSaveDate(birthdate)
            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }

                response = await readRecord(tables.tables.Users, id_user, connection);
                console.log(response)
                if (response[0]) {
                    const user = response[2];

                    let updateUser = {};
                    if (new_password != '') {

                        isSamePassword = await validatePassword(user, current_password);

                        if (isSamePassword[0]) {
                            const changePassword = await validatePassword(user, new_password)
                            console.log(changePassword)
                            if (!changePassword[0]) {
                                const salt = bcrypt.genSaltSync();
                                updateUser.password = bcrypt.hashSync(new_password, salt);
                                response = await updateRecord(updateUser, tables.tables.Users, id_user, connection);
                            }

                        }
                    }
                    if (response[0]) {
                        const client = {
                            name,
                            birthdate: birthdateFormat,
                        };
                        response = await updateRecords(client, tables.tables.Clients, `id_user = ${id_user}`, connection);

                        if (response[0]) {
                            await uploadFilesByPhotoProfile(req.files, user, connection)
                        }

                    }
                }

                connection.release();
                myConnection.end();

                return res.status(response[1].code).json({
                    ok: response[0],
                    message: response[1].message,
                    password: isSamePassword,
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

    editIdDevice: async (req, res) => {
        try {

            const { id_device } = req.body;
            let response = 0;

            const myConnection = pool.connection(constants.DATABASE);
            myConnection.getConnection(async function (err, connection) {
                if (err) {
                    return res.status(errors.errorConnection.code).json({
                        ok: false,
                        message: errors.errorConnection.message,
                    });
                }

                const client = { id_device };
                const condition = `id_user = ${req.id_user}`;

                response = await updateRecords(client, tables.tables.Clients, condition, connection);

                // Liberar la conexión y cerrar la base de datos
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
