"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const {sanitizeEntity, convertRestQueryParams} = require("strapi-utils");

module.exports = {

    /**
     * get random images
     *
     * @param ctx
     * @field limit
     * @return {Promise<void>}
     */
    random: async function (ctx) {
        const query = convertRestQueryParams(ctx.request.query);
        try {
            const images =  await new Promise((resolve, reject) => {
                strapi.query("images").model.findRandom({available: true}, {}, {limit: query.limit}, (err, result) => {
                    if (err) reject(err);
                    else resolve(result)
                })
            });
            ctx.send(images)
            // resolve(images.map(image => sanitizeEntity(image, {model: strapi.models.images})));

        } catch (e) {
            return ctx.badImplementation(e);
        }
    }
};
