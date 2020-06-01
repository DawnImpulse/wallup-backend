module.exports = {
  "defaultConnection": "default",
  "connections": {
    "default": {
      "connector": "mongoose",
      "settings": {
        "uri": process.env.MONGO_URI
      }
    }
  }
}
