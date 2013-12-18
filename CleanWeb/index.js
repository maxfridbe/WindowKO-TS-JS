define(["require", "exports", 'App/lib/knockout', 'App/ViewModels/MainViewModel', 'App/lib/jquery', 'App/lib/pager', 'App/extensions/knockout/windowing'], function(require, exports, ko, MainViewModel, $, pager, p1) {
    (function (Index) {
        //application
        var main = new MainViewModel();
        pager.extendWithPage(main);
        pager.start();

        ko.applyBindings(main, document.getElementById("app"));
    })(exports.Index || (exports.Index = {}));
    var Index = exports.Index;
});
//# sourceMappingURL=index.js.map
