import ip from "ip";

export default () => {
    let localIp = ip.address();

    return async(ctx, next) => {
        ctx.req.file && (ctx.req.file.staticUrl = "http://" + localIp + ":3000/uploads/" + ctx.req.file.filename);

        ctx.body = ctx.req.file;
    };
};