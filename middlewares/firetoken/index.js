/**
 * @info - authentication for firebase token
 */
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT))
});

/**
 * verify token & extract uid
 */
function verify(ctx) {
    return new Promise((resolve, reject) => {
        const token = ctx.get("token")
        if (token)
            admin.auth().verifyIdToken(token)
                .then(decoded => {
                    resolve(decoded.uid)
                })
                .catch(err => {
                    reject("invalid token provided")
                })
        else
            reject("token not provided")
    })
}

/**
 * export
 *
 * @param strapi
 */
module.exports = strapi => {
    return {
        initialize() {
            strapi.app.use(async (ctx, next) => {
                const path = ctx.request.path;
                const method = ctx.request.method;

                if (method === "GET" && path === "/bookmarks" ||
                    method === "POST" && path === "/bookmarks" ||
                    method === "DELETE" && path.indexOf("/bookmarks") > -1)

                    try {
                        const uid = await verify(ctx)
                        if (method === "GET" && path === "/bookmarks")
                            ctx.request.query ? ctx.request.query.uid = uid : ctx.request.query = {uid: uid}
                        else if (method === "POST" && path === "/bookmarks")
                            ctx.request.body ? ctx.request.body.uid = uid : ctx.request.body = {uid: uid}
                        else if (method === "DELETE" && path.indexOf("/bookmarks") > -1)
                            ctx.request.query ? ctx.request.query.uid = uid : ctx.request.query = {uid: uid}
                        await next()
                        // handle errors
                    } catch (err) {
                        ctx.forbidden(err)
                    }
                else
                    await next()
            });
        },
    };
};

