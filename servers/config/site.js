import path from 'path';

export default {
    PORT: 3000,
    backup: path.resolve(__dirname, '../../../uploads/backup'),
    env: process.env.NODE_ENV,
    events: 'http://172.16.140.168:3000/events'
}