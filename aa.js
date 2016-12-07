var b = [{ "value": "cmd", "required": true, "placeholder": "", "type": "string" },
    { "value": "cwd", "required": false, "placeholder": "", "type": "string" },
    { "value": "stdin", "required": false, "placeholder": "", "type": "string" },
    { "value": "runas", "required": false, "placeholder": "", "type": "string" },
    { "value": "shell", "required": false, "placeholder": "/bin/sh", "type": "string" },
    {
        "value": "python_shell",
        "required": false,
        "placeholder": "true",
        "type": "string"
    },
    { "value": "env", "required": false, "placeholder": "", "type": "string" },
    { "value": "clean_env", "required": false, "placeholder": "false", "type": "string" },
    { "value": "template", "required": false, "placeholder": "", "type": "string" },
    { "value": "rstrip", "required": false, "placeholder": "true", "type": "string" },
    { "value": "umask", "required": false, "placeholder": "", "type": "string" },
    { "value": "quiet", "required": false, "placeholder": "false", "type": "string" },
    { "value": "timeout", "required": false, "placeholder": "", "type": "string" },
    { "value": "reset_system_locale", "required": false, "placeholder": "true", "type": "string" }
]

var a = [];
var c = {};

for (var i = 0; i < b.length; i++) {
    c[b[i].value] = {
        "type": "string",
        "title": b[i].value,
        "default": b[i].placeholder
    };
    a.push({
        "key": `options.${b[i].value}`,
        "type": "text",
        "copyValutTo": [`args[${i}]`],
        required: b[i].required
    });
}

console.log(JSON.stringify(c));

console.log(JSON.stringify(a));