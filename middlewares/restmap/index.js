/**
 * @info - middleware for restmap functionality
 */
const {verifyMap, mapData} = require("restmap");

module.exports = strapi => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        await next();
        if(ctx.headers.restmap){
          if(verifyMap(ctx.headers.restmap)){
            ctx.body = mapData(ctx.headers.restmap, ctx.body)
          }
        }
      });
    },
  };
};

