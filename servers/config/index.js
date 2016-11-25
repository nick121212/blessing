export default {
    middleware: require('./middleware').default,
    site: require('./site').default,
    db: require('./db').default,
    es: require('./es').default,
    rabbitmq: require('./rabbitmq').default
};