/**
 * Created by NICK on 16/8/19.
 */

const tty = require('tty.js');


const ttyApp = tty.createServer({
    shell: 'bash',
    users: {
        foo: 'bar'
    },
    port: 7000
});
console.log(ttyApp.io);

ttyApp.get('/foo', function (req, res, next) {
    res.send('bar');
});
ttyApp.listen();