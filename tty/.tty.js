 {
    "users": {
        "hello": "world"
    },
    "https": {
        "key": "./server.key",
        "cert": "./server.crt"
    },
    "port": 8080,
    "hostname": "127.0.0.1",
    "shell": "sh",
    "shellArgs": ["arg1", "arg2"],
    "static": "./static",
    "limitGlobal": 10000,
    "limitPerUser": 1000,
    "localOnly": false,
    "cwd": ".",
    "syncSession": false,
    "sessionTimeout": 600000,
    "log": true,
    "io": {"log": false},
    "debug": false,
    "term": {
        "termName": "xterm",
        "geometry": [80, 24],
        "scrollback": 1000,
        "visualBell": false,
        "popOnBell": false,
        "cursorBlink": false,
        "screenKeys": false,
        "colors": [
            "#2e3436",
            "#cc0000",
            "#4e9a06",
            "#c4a000",
            "#3465a4",
            "#75507b",
            "#06989a",
            "#d3d7cf",
            "#555753",
            "#ef2929",
            "#8ae234",
            "#fce94f",
            "#729fcf",
            "#ad7fa8",
            "#34e2e2",
            "#eeeeec"
        ]
    }
}