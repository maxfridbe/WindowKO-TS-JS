import parameters = require('parameters');


//configure require
requirejs.config({
    paths: {
        'jquery': "node_modules/pagerjs/node_modules/jquery/dist/jquery.min",
        'knockout': "node_modules/pagerjs/node_modules/knockout/build/output/knockout-latest",
        'pager': "node_modules/pagerjs/pager"
    },
    urlArgs: "v=" + parameters.version
});

require(['index']); 
