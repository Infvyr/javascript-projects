module.exports = ({ content }) => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head profile="http://www.w3.org/2005/10/profile">
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>JS Ecommerce Webshop</title>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.2/css/bulma.min.css" rel="stylesheet">
            <link href="/css/main.css" rel="stylesheet">
        </head>
        <body class="admin>
            <header>
            <nav class="navbar navbar-bottom">
                <div class="container navbar-container">
                    <div>
                        <h3 class="title">
                            <a href="/admin">Title</a>
                        </h3>
                    </div>
                    <div class="navbar-item">
                        <div class="navbar-buttons">
                            <div class="navbar-item">
                                <a href="/admin">
                                    <i class="fa fa-star"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            </header>
            <div class="container">
                ${content}
            </div>
        </body>
    </html>
    `;
};
