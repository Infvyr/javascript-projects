const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositiories/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys: ["asdefWfdsfgrF3O9fd8S8w"], // encrypt all the info stored inside cookie
    }),
);

app.get("/signup", (req, res) => {
    res.send(`
        <div>
            Your id is: ${req.session.userId}
            <form method="POST">
                <input placeholder="email" name="email" />
                <input placeholder="password" name="password" />
                <input placeholder="password confirmation" name="passwordConfirmation" />
                <button>Sign up</button>
            </form>
        </div>
    `);
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
app.post("/signup", async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) return res.send("Email in use!");
    if (password !== passwordConfirmation)
        return res.send("Passwords must much!");

    // Create a user in our repo to represent this person
    const user = await usersRepo.create({ email: email, password: password });

    // Store the id of that user inside the users cookies
    // req.session === {}; // Added by cookie session!
    req.session.userId = user.id;

    res.send("Account created!!!");
});

app.get("/signout", (req, res) => {
    req.session = null;
    res.send("You are logged out!");
});

app.get("/signin", (req, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input placeholder="email" name="email" />
            <input placeholder="password" name="password" />
            <button>Sign In</button>
        </form>
    </div>
    `);
});

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email: email });

    if (!user) return res.send("Email not found");

    const validPassword = await usersRepo.comparePasswords(
        user.password,
        password, // req.body
    );
    if (!validPassword) return res.send("Invalid password!");

    req.session.userId = user.id;
    res.send("You are signed in!!!");
});

app.listen(3000, () => console.log("Listening"));
