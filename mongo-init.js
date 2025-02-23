/* eslint-disable */
db.createUser(
    {
        user: "antavo",
        pwd: "qwe123",
        roles: [
            {
                role: "readWrite",
                db: "antavo"
            }
        ]
    }
);