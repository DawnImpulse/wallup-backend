"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    /**
     * get random images
     *
     * @param ctx
     * @field limit
     * @return {Promise<void>}
     */
    random: async function (ctx) {
        let limit = 30
        if (ctx.request.query && ctx.request.query._limit)
            limit = ctx.request.query._limit

        try {
            return new Promise((resolve, reject) => {
                strapi.query("images").model.findRandom({"available": true}, {}, {
                        limit,
                        populate: "device"
                    },
                    (err, result) => {
                        if (err) reject(err)
                        else resolve(result)
                    })
            })
        } catch (e) {
            ctx.badImplementation(e.toString())
        }
    }
};
