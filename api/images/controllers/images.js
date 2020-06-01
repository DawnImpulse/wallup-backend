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
            return await new Promise((resolve, reject) => {
                strapi.query("images").model.findRandom({}, {}, {limit: query.limit}, (err, result) => {
                    if (err) reject(err);
                    else resolve(result)
                })
            });
            // resolve(images.map(image => sanitizeEntity(image, {model: strapi.models.images})));

        } catch (e) {
            return ctx.badImplementation(e);
        }
    },

    /**
     * homescreen category / collections / images
     *
     * @param ctx
     * @return {Promise<{collections: *, category: *}>}
     */
    homescreen: async function (ctx) {
        try {
            return {
                collections: await strapi.query("collection").find({
                    _limit: 10,
                    _sort: 'updatedAt:desc'
                }),
                category: await strapi.query("category").find({_sort: 'name:asc'})
            }
        } catch (e) {
            console.log(e);
            return ctx.badImplementation(e)
        }
    }
};
