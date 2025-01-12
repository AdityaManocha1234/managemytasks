// const router = require("express").Router();
// const { User, validate } = require("../Models/User")
// const Joi = require("joi")
// const bcrypt = require('bcrypt')
//
//
// router.post("/", async (req, res) => {
//     try {
//         const { error } = validate(req.body);
//         if (error)
//             return res.status(400).send({ message: error.details[0].message });
//         const user = await User.findOne({ email: req.body.email })
//         if (!user)
//             return res.status(401).send({ message: "Invalid email or password" })
//         const validPassword = await bcrypt.compare(req.body.password, user.password);
//         if (!validPassword)
//             return res.status(401).send({ message: "Invalid password or email" })
//         const token = user.generateAuthToken();
//
//         res.status(200).send({ data: token, message: "Logged in successfully" })
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: "Internal Server" })
//
//     }
// })
//
// const validateLogin = (data) => {
//     const schema = Joi.object({
//
//         email: Joi.string().email().required().label("Email"),
//         password: passwordComplexity().required().label("Password"),
//     })
//     return schema.validateLogin(data)
// }
//
// module.exports = router;
const router = require("express").Router();
const { User, validate } = require("../Models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi")


router.post("/", async (req, res) => {
    try {
        // Ensure only email and password fields are validated for login
        const schema = Joi.object({
            email: Joi.string().email().required().label("Email"),
            password: Joi.string().min(6).required().label("Password"),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server" });
    }
});

module.exports = router;
