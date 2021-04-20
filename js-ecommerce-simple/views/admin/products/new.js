const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors }) => {
    return layout({
        content: `
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="subtitle">Create a product</h1>
                    <form method="POST" enctype="multipart/form-data" class="new-product">
                        <div class="field">
                            <label for="title" class="label">Title</label>
                            <input type="text" id="title" class="input" name="title" placeholder="Title" />
                            <p class="help is-danger">${getError(
                                errors,
                                "title",
                            )}</p>
                        </div>
                        <div class="field">
                            <label for="price" class="label">Price</label>
                            <input type="text" id="price" class="input" name="price" placeholder="Price" />
                            <p class="help is-danger">${getError(
                                errors,
                                "price",
                            )}</p>
                        </div>
                        <div class="field">
                            <label for="image" class="label">Image</label>
                            <input type="file" id="image" name="image" />
                        </div>
                        </br>
                        <button class="button is-primary">Add new product</button>
                    </form>
                </div>
            </div>
        `,
    });
};
