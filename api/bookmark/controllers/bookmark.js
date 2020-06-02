'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    /**
     * create
     * @param ctx
     * @return {Promise<*>}
     */
    create: async (ctx) => {
        try {
            if (ctx.request.body.image) {
                if (ctx.request.body.image.match(/^[0-9a-fA-F]{24}$/)) {
                    const image = await strapi.query("images").findOne({_id: ctx.request.body.image})
                    if (image != null)
                        return await strapi.query("bookmark").create({
                            uid: ctx.request.body.uid,
                            image: ctx.request.body.image
                        })
                    else
                        ctx.badRequest("image not exists")
                } else
                    ctx.badRequest("invalid image id")
            } else
                ctx.badRequest("kindly provide image id")
        } catch (e) {
            console.log(e)
            ctx.badImplementation(e)
        }
    },
    /**
     * delete bookmark
     * @param ctx
     * @return {Promise<*>}
     */
    delete: async (ctx) => {
        try {
            if (ctx.params.id)
                if (ctx.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                    const result = await strapi.query("bookmark").delete({
                        uid: ctx.request.query.uid,
                        _id: ctx.params.id
                    })
                    if (result)
                        return {
                            success: true,
                            message: "deleted successfully"
                        }
                    else
                        ctx.badRequest("bookmark not exists")
                } else
                    ctx.badRequest("invalid bookmark id")
            else
                ctx.badRequest("kindly provide bookmark id")
        } catch (e) {
            ctx.badImplementation(e)
        }
    },
};
