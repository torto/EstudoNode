var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function() {
    var app = express();

    app.set('port', 3000);

    app.use(express.static('./public'));
    //app.use(app.router);

    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    //seguir em order, model-controllers-routes-into(app)
    //cwd - muda a pasta padrao para app e não a raiz
    load('models', {
        cwd: 'app'
    }).then('controllers')
        .then('routes')
        .into(app);


    return app;
}