module.exports = ({ content }) => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head profile="http://www.w3.org/2005/10/profile">
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>JS Ecommerce Webshop</title>
            <link type="image/png" rel="alternate icon" href="/images/favicon.png" />
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.2/css/bulma.min.css" rel="stylesheet">
            <link href="/css/main.css" rel="stylesheet">
        </head>
        <body class="admin>
            <header>
            <nav class="navbar navbar-bottom">
                <div class="container navbar-container">
                    <div>
                        <h3 class="title">
                            <a href="/admin">
                                <i class="fas fa-user-cog"></i>
                                Admin Panel
                            </a>
                        </h3>
                    </div>
                    <div class="navbar-item">
                        <div class="navbar-buttons">
                            <div class="navbar-item">
                                <a href="/products" title="Visit Shop" target="_blank">
                                    <i class="fas fa-store"></i>
                                    Products
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
