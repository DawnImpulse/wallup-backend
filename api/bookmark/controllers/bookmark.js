'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    /**
     * delete bookmark
     * @param ctx
     * @return {Promise<*>}
     */
    delete: async (ctx) => {
        try {
            return await strapi.query("bookmark").delete({
                uid: ctx.get("uid"),
                _id: ctx.params.id
            })
        } catch (e) {
            ctx.badImplementation(e)
        }
    },
};
