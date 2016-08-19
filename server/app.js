import Koa from 'koa';
import consign from 'consign';
import log4js from 'koa-log4';
import tty from 'tty.js';

// const app = new Koa();
// const logger = log4js.getLogger("index");
//
// consign({
//     extensions: ['.js', '.json', '.node']
// })
//     .include('config')
//     .then('middlewares')
//     .then('controllers')
//     .then('routes/passport')
//     .then('auth')
//     .then('routes')
//     .then('controllers')
//     .into(app, logger);
//
//
// app.listen(3000, () => console.log('server started 3000'));
const ttyApp = tty.createServer({
    shell: 'bash',
    users: {
        foo: 'bar'
    },
    port: 7000
});
ttyApp.get('/foo', function(req, res, next){
    res.send('bar');
});
ttyApp.listen();

// export default app;