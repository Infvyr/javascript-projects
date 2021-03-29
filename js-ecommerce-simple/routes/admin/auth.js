const express = require("express");

// destructuring check function from express-validator
// instead of using const expressValidator = ...
const { check, validationResult } = require("express-validator");

const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const {
    requireEmail,
    requirePassword,
    requirePasswordConfirmation,
    requireEmailExists,
    requireValidPasswordForUser,
} = require("./validators");

const router = express.Router();

router.get("/signup", (req, res) => {
    res.send(signupTemplate({ req }));
});

// express middleware function
// const bodyParser = (req, res, next) => {
//     if (req.method == "POST") {
//         // get access to email, password, passwordConfirmation
//         // data == event
//         req.on("data", (data) => {
//             const parsed = data.toString("utf8").split("&");
//             const formData = {};
//             for (let pair of parsed) {
//                 const [key, value] = pair.split("=");
//                 formData[key] = value;
//             }
//             req.body = formData;
//             next();
//         });
//     } else {
//         next();
//     }
// };

// urlencoded = same thing as the code commented above
router.post(
    "/signup",
    [requireEmail, requirePassword, requirePasswordConfirmation],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.send(signupTemplate({ req, errors }));

        const { email, password, passwordConfirmation } = req.body;

        // Create a user in our repo to represent this person
        const user = await usersRepo.create({
            email: email,
            password: password,
        });

        // Store the id of that user inside the users cookies
        // req.session === {}; // Added by cookie session!
        req.session.userId = user.id;

        res.send("Account created!!!");
    },
);

router.get("/signout", (req, res) => {
    req.session = null;
    res.send("You are logged out!");
});

router.get("/signin", (req, res) => {
    res.send(signinTemplate({}));
});

router.post(
    "/signin",
    [requireEmailExists, requireValidPasswordForUser],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.send(signinTemplate({ errors }));

        const { email } = req.body;
        const user = await usersRepo.getOneBy({ email: email });

        req.session.userId = user.id;
        res.send("You are signed in!!!");
    },
);

module.exports = router;