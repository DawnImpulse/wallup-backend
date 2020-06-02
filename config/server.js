module.exports = {
    "host": "0.0.0.0",
    "port": process.env.OS_PORT,
    "proxy": {
        "enabled": false
    },
    "cron": {
        "enabled": process.env.CRON
    },
    "admin": {
        "autoOpen": false,
        "url": "/dashboard"
    }
}
