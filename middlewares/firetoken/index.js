/**
 * @info - authentication for firebase token
 */
const {verifyMap, mapData} = require("restmap");
const admin = require("firebase-admin");

/**
 * verify token & extract uid
 */
function verify(ctx) {
    return new Promise((resolve, reject) => {
        const token = ctx.get("token")
        if (token)
            admin.auth().verifyIdToken(token)
                .then(decoded => {
                    ctx.set("uid", decoded.uid)
                    resolve(uid)
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
                    method === "DELETE" && path === "/bookmarks")

                    try {
                        const uid = await verify(ctx)
                        if (method === "GET" && path === "/bookmarks") ctx.query.uid = uid
                        else if (method === "POST" && path === "/bookmarks") ctx.body.uid = uid

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

