

import ko = require('App/lib/knockout')
import MainViewModel = require('App/ViewModels/MainViewModel')
import $ = require('App/lib/jquery')
import pager = require('App/lib/pager')

//import plugins
import p1 = require('App/extensions/knockout/windowing')

export module Index {

   

    //application
    var main = new MainViewModel()
    pager.extendWithPage(main);
    pager.start();

    ko.applyBindings(main, document.getElementById("app"));
}