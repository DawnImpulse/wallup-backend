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
            "firetoken"
        ],
        "after": [
            "parser",
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