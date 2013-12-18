declare var require;
import $ = require('App/lib/jquery')

class PageViewModel {
    constructor() { }

    SourceLoaded() { }
    Shown() { }
    Hidden() { }

    _onPageIn(page, callback) {
        $(page.element).hide().fadeIn(1000, callback);
    }
    _onPageOut(page, callback) {
        var $e = $(page.element);
        if (!page.pageHiddenOnce) {
            page.pageHiddenOnce = true;
            $e.hide();
        } else {
            $e.fadeOut(1000, function () {
                $e.hide();
            });
            if (callback) {
                callback();
            }
        }
    }
    _loadView(viewModule) {
        return function (page, callback) {
            require([viewModule], function (viewString) {
                $(page.element).html(viewString);
                callback();
            });
        };
    }

    _loadVM(viewModelName: string, dfdVMLoaded: JQueryDeferred<PageViewModel>) {
        return function (callback) {
            require([viewModelName], function (mod) {
                var viewModel: PageViewModel = new mod();
                dfdVMLoaded.resolve(viewModel);
                callback(viewModel);
            });
        };
    }
    _buildShow(vmPromise: JQueryPromise<PageViewModel>): (page, callback) => void {
        return (page, callback) => {
            vmPromise.done((vm: PageViewModel) => {
                this._onPageIn(page, () => {
                    if (callback) callback();
                    vm.Shown();
                });
            });
        };
    }
    _buildHide(vmPromise: JQueryPromise<PageViewModel>) {
        return (page, callback) => {
            vmPromise.done((vm: PageViewModel) => {
                this._onPageOut(page, () => {
                    if (callback) callback();
                    vm.Hidden();
                });
            });
        };
    }
    _page(pageRouteId: string, title: string, area: string, conventionName: string): IPageConfig {
        var viewName: string = area + "/views/" + conventionName + "View.htm";
        var viewModelName: string = area + "/viewmodels/" + conventionName + "ViewModel";

        var dfdSourceLoaded = $.Deferred();
        var dfdVMLoaded = $.Deferred<PageViewModel>();

        var vmPromise = dfdVMLoaded.promise();


        return <IPageConfig>{
            id: pageRouteId,
            title: title,
            showElement: this._buildShow(vmPromise),
            hideElement: this._buildHide(vmPromise),
            withOnShow: this._loadVM(viewModelName, dfdVMLoaded),
            sourceOnShow: viewName,
            sourceLoaded: () => {
                vmPromise.done((vm: PageViewModel) => {
                    vm.SourceLoaded();
                });
            },
        };
    }
}

export = PageViewModel;