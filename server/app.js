import Koa from 'koa';
import consign from 'consign';
import log4js from 'koa-log4';
import _ from 'lodash';

const app = opinion({
    middlewareOrder: opinion.DEFAULT_MIDDLEWARE_STACK,
    keys: ['78fd9fe83f2af46f2a8b567154db8d2a']
});

const logger = log4js.getLogger("index");



// consign({
//     verbose: false,
//     extensions: ['.js', '.json', '.node']
// })
// .include('config')
// .then('middlewares')
// .then('controllers')
// .then('routes/passport')
// .then('routes/home')
// .then('auth')
// .then('routes')
// .then('controllers')
// .into(app, logger);

app.get('/',
    function*() {
        yield this.render('hello-world');
    }
);

app.listen(prosess.env.PORT || 3000, function() {
    console.log("Server listening on %s", this._connectionKey);
});

export default {
    app: app,
    logger: logger
}