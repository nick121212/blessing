import path from 'path';

export default {
    PORT: 3000,
    backup: path.resolve(__dirname, '../../../uploads/backup'),
    env: process.env.NODE_ENV,
    events: 'http://localhost:3000/events'
}