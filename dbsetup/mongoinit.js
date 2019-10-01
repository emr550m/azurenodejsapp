db.auth('admin', '123456')

dbusers = db.getSiblingDB('nodejs')

db.createUser({
    user: 'emr550m',
    pwd: '123456',
    roles: [
        {
            role: 'root',
            db: 'admin',
        },
        {
            role: 'readWrite',
            db: 'nodejs',
        },
    ],
});

dbusers.users.insert({ "_id": "5c7d64827d27c035c4e43a90", "username": "emr550m", "password": "513a63d2e7da724093b5ec80b973d3cab053f81adf197ffe8039b0889ee45e6fc76cba887bf69d360e18b57035fab6ce180a0d386a6e9af34b0e4a255acc0556", "salt": "2a99f6f07f57797b", "lastlogin": "2019-09-29T23:09:47.247Z", "name": "Emrah", "surname": "Öz", "tokens": [{ "token": "4e4d75a24f2fbcd33c34666bb40a463f62eaf33e", "time": "2019-03-23T16:30:43.226Z" }, { "token": "256b24da66e63ae080ac7b7b96637a272fc1a2ad", "time": "2019-04-07T12:13:16.458Z" }, { "token": "7d1c9a76ca7032d6bc49d5af36ae7cb11d52959c", "time": "2019-04-07T12:13:28.616Z" }, { "token": "9a5bc1447995f90c17329f85789ee6a589195503", "time": "2019-09-29T19:53:14.622Z" }, { "token": "bbae7e033a0b4d2c11e4b3254179f294dbcbfe8e", "time": "2019-09-29T23:09:47.247Z" }], "lasttry": "2019-09-29T23:09:47.247Z" });

