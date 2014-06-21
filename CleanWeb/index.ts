import ko = require('app/lib/knockout');
import $ = require('app/lib/jquery');
import system = require('app/framework/system');
import PageViewModel = require('app/framework/domain/PageViewModel');
import p1 = require('app/lib/extensions/knockout/windowing');
import pager = require('app/lib/pager');
import parameters = require('parameters');

p1;//ensure plugin loads
pager.onSourceError.add(function (event) {
    var page = event.page;
    var elm: HTMLDivElement = page.element;
    elm.innerHTML = "<div class='alert'>Error loading page" + event.url + "</div>";
});

//load templates
var tmplPromise = system.LoadTemplatesAsync([
    { templateId: "tmplWindowed", templatePath: "/app/framework/templates/windowtemplates.htm" },
    { templateId: "tmplGrid", templatePath: "/app/framework/templates/gridtemplates.htm" },
]);

interface IPagerDiv {
    config: IPagerPageConfig;
    cssClass: string;
}

//setup pager + knockout
class IndexViewModel extends PageViewModel {

    pageFromManifest(areaManifest: IAreaManifest): IPagerDiv {
        var p = this._page(areaManifest.UrlToken,
            areaManifest.Title,
            'app/areas/' + areaManifest.Key,
            areaManifest.InitialModule);
        return {
            config: p,
            cssClass: areaManifest.Key
        };
    }

    constructor() {
        super();


        parameters.areas.forEach((area) => {
            var areaName = 'app/areas/' + area;
            system.RequireAsync<IAreaManifest>(areaName + '/manifest')
                .done((areaManifest: IAreaManifest) => {
                    if (areaManifest.LoadStyle) {
                        system.LoadStyleAsync(areaName + '/styles/' + areaManifest.LoadStyle).done(() => {
                            var p = this.pageFromManifest(areaManifest);
                            this.Pages.push(p);
                        });
                    }
                    else {
                        var p = this.pageFromManifest(areaManifest);
                        this.Pages.push(p);
                    }

                    if (area == 'home')
                        return;
                    this.Navigation.push({ Href: "#start/" + areaManifest.UrlToken, Title: areaManifest.Title });
                });

        });

    }

    public Navigation = ko.observableArray<IPageNavigation>();
    public Pages = ko.observableArray<IPagerDiv>();
}



//application
var indexVm = new IndexViewModel();
pager.extendWithPage(indexVm);
if (window.location.href.indexOf("#start") !== -1) {
    pager.start();
} else {
    pager.start('start/start');
}



//apply bindings
tmplPromise.done(() => {
    ko.applyBindings(indexVm);
});





