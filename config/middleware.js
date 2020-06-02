/**
 * @info middleware file
 */
module.exports = {
    "timeout": 5000,
    "load": {
        "before": [
            "responseTime",
            "logger",
            "cors",
            "responses",
            "gzip"
        ],
        "order": [
        ],
        "after": [
            "parser",
            "firetoken",
            "router",
            "restmap"
        ]
    },
    "settings": {
        "restmap": {
            "enabled": true
        },
        "firetoken": {
            "enabled": true
        }
    }
}