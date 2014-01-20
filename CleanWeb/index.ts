

import ko = require('App/lib/knockout')
import MainViewModel = require('App/ViewModels/MainViewModel')
import $ = require('App/lib/jquery')
import pager = require('App/lib/pager')

//import plugins
import p1 = require('App/lib/extensions/knockout/windowing')


import system = require('App/framework/system');

export module Index {
    pager.onSourceError.add(function (event) {
        var page = event.page;
        $(page.element).empty().append($('<div></div>', { text: 'Error loading page ' + event.url, "class": 'alert' }));
    });

    //application
    var main = new MainViewModel()
    pager.extendWithPage(main);
    if (window.location.href.indexOf("#start") !== -1) {
        pager.start();
    } else {
        pager.start('start');
    }

    //load templates
    var tmplPromise = system.LoadTemplates([
        { templateId: "tmplWindowed", templatePath: "/app/framework/templates/windowtemplates.htm" },
        { templateId: "tmplGrid", templatePath: "/app/framework/templates/gridtemplates.htm" },
    ]);

    //apply bindings
    tmplPromise.done(() => {
        ko.applyBindings(main, document.getElementById("app"))
    });
}