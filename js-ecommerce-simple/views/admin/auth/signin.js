const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors }) => {
    return layout({
        content: `
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-one-quarter">
                    <form method="POST">
                    <h1 class="title">Sign in</h1>
                    <div class="field">
                        <label for="email" class="label">Email</label>
                        <input placeholder="email" name="email" id="email" class="input" required/>
                        <p class="help is-danger">${getError(
                            errors,
                            "email",
                        )}</p>
                    </div>
                    <div class="field">
                        <label for="password" class="label">Password</label>
                        <input placeholder="password" name="password" id="password" class="input" required/>
                        <p class="help is-danger">${getError(
                            errors,
                            "password",
                        )}</p>
                    </div>
                    <button class="button is-primary">Submit</button>
                    </form>
                    <hr>
                    <a href="/signup">Need an account? Sign up</a>
                </div>
            </div>
        </div>`,
    });
};
