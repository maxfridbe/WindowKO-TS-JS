define(["require", "exports", 'App/lib/knockout', 'App/ViewModels/MainViewModel', 'App/lib/jquery', 'App/lib/pager', 'App/lib/extensions/knockout/windowing', 'App/framework/system'], function(require, exports, ko, MainViewModel, $, pager, p1, system) {
    (function (Index) {
        pager.onSourceError.add(function (event) {
            var page = event.page;
            $(page.element).empty().append($('<div></div>', { text: 'Error loading page ' + event.url, "class": 'alert' }));
        });

        //application
        var main = new MainViewModel();
        pager.extendWithPage(main);
        pager.start();

        //load templates
        var tmplPromise = system.LoadTemplates([{ templateId: "tmplWindowed", templatePath: "/app/framework/templates/windowtemplates.htm" }]);

        //apply bindings
        tmplPromise.done(function () {
            ko.applyBindings(main, document.getElementById("app"));
        });
    })(exports.Index || (exports.Index = {}));
    var Index = exports.Index;
});
//# sourceMappingURL=index.js.map
