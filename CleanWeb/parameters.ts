//global variables
var variables = {
    debug: true,
    version: "v1",
    areas: <string[]>[
        'home',
        'example'
    ]
};
if (variables.debug)
    variables.version = (new Date()).getTime().toString();

export = variables;