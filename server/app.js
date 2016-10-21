import Koa from 'koa';
import consign from 'consign';
import log4js from 'koa-log4';
import _ from 'lodash';

const app = new Koa();
const logger = log4js.getLogger("index");
const tty = require('tty.js');

consign({
    verbose: false,
    extensions: ['.js', '.json', '.node']
})
    .include('config')
    .then('middlewares')
    .then('controllers')
    .then('routes/passport')
    .then('routes/home')
    .then('auth')
    .then('routes')
    .then('controllers')
    .into(app, logger);

const conf = tty.config.readConfig(), ttyApp = tty.createServer(_.extend(conf,
    {port: 3001}));
ttyApp.listen();

app.listen(3000, () => console.log('server started 3000'));

export default app;