const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const account = require('../model/models/users')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');
const jwt = require("jsonwebtoken");
const secretKey = "THANH125202";


class accountRepository extends BaseRepository {
    constructor() {
        super(account);
    }
    async login(username, password) {
        try {
            const exist_user = await account.findOne({
                where: {
                    username: username,
                    password: password,
                },
            });
            // console.log(exist_user)
            if (exist_user) {
                const token = jwt.sign({
                    id: exist_user.id,
                    username: exist_user.username,
                    fullname:exist_user.name,
                    email:exist_user.email,
                    sdt:exist_user.sdt,
                    address:exist_user.address,
                    status:exist_user.status,
                }, secretKey, { expiresIn: "24h" });

                return {
                    id: exist_user.id,
                    username: exist_user.username,
                    token}
            }
        }
        catch (error) {
            throw error;
        }
    }

}

module.exports = new accountRepository();
