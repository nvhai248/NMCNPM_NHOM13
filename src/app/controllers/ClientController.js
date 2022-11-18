const Client  = require('../models/client');
const mongooseHelper = require('../util/mongoose');

class ClientController {
    // get interface
    //[GET] /client
    interface(req, res, next) {
        res.render("client", {
            title: `Client: ${req.params.id}`
        });
    }

    // [POST] /client/login
    checkLogin(req, res, next) {
        Client.findOne({
            email: req.body.email,
            password: req.body.password
        }).then(client => {
            if (client.length == 0) {
                res.render('login', {
                    notification: "Nhập sai email hoặc mật khẩu!",
                })
            }
            else {
                let id = mongooseHelper.mongoosesToObject(client)._id;
                res.redirect(`/client/${id}`);
            }
        })
            .catch(next);
    }
}

module.exports = new ClientController();
