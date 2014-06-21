var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'app/lib/knockout', 'app/framework/system', 'app/framework/domain/PageViewModel', 'app/lib/extensions/knockout/windowing', 'app/lib/pager', 'parameters'], function(require, exports, ko, system, PageViewModel, p1, pager, parameters) {
    p1; //ensure plugin loads
    pager.onSourceError.add(function (event) {
        var page = event.page;
        var elm = page.element;
        elm.innerHTML = "<div class='alert'>Error loading page" + event.url + "</div>";
    });

    //load templates
    var tmplPromise = system.LoadTemplatesAsync([
        { templateId: "tmplWindowed", templatePath: "/app/framework/templates/windowtemplates.htm" },
        { templateId: "tmplGrid", templatePath: "/app/framework/templates/gridtemplates.htm" }
    ]);

    //setup pager + knockout
    var IndexViewModel = (function (_super) {
        __extends(IndexViewModel, _super);
        function IndexViewModel() {
            var _this = this;
            _super.call(this);
            this.Navigation = ko.observableArray();
            this.Pages = ko.observableArray();

            parameters.areas.forEach(function (area) {
                var areaName = 'app/areas/' + area;
                system.RequireAsync(areaName + '/manifest').done(function (areaManifest) {
                    if (areaManifest.LoadStyle) {
                        system.LoadStyleAsync(areaName + '/styles/' + areaManifest.LoadStyle).done(function () {
                            var p = _this.pageFromManifest(areaManifest);
                            _this.Pages.push(p);
                        });
                    } else {
                        var p = _this.pageFromManifest(areaManifest);
                        _this.Pages.push(p);
                    }

                    if (area == 'home')
                        return;
                    _this.Navigation.push({ Href: "#start/" + areaManifest.UrlToken, Title: areaManifest.Title });
                });
            });
        }
        IndexViewModel.prototype.pageFromManifest = function (areaManifest) {
            var p = this._page(areaManifest.UrlToken, areaManifest.Title, 'app/areas/' + areaManifest.Key, areaManifest.InitialModule);
            return {
                config: p,
                cssClass: areaManifest.Key
            };
        };
        return IndexViewModel;
    })(PageViewModel);

    //application
    var indexVm = new IndexViewModel();
    pager.extendWithPage(indexVm);
    if (window.location.href.indexOf("#start") !== -1) {
        pager.start();
    } else {
        pager.start('start/start');
    }

    //apply bindings
    tmplPromise.done(function () {
        ko.applyBindings(indexVm);
    });
});
