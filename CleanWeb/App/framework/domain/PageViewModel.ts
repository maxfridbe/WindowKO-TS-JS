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
    _loadView(viewName:string) {
        return function (page, callback) {
            $.get(viewName).done((viewString) => {
                $(page.element).hide().html(viewString);
                callback();
            });
        };
    }
    _loadVM(viewModelName: string, loadVMPromise: JQueryPromise<any>): JQueryPromise<any>{
        var dfdVMLoad = $.Deferred();
        loadVMPromise.done(() => {
            require([viewModelName], function (mod) {
                var viewModel: PageViewModel = new mod();
                dfdVMLoad.resolve(viewModel);
            });
        });
        return dfdVMLoad.promise();
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
    _buildWithOnShow(dfdShouldLoadVM: JQueryDeferred<any>, vmPromise: JQueryPromise<any>) {
        return function (callback) {
            dfdShouldLoadVM.resolve();
            vmPromise.done((vm) => {
                callback(vm);
            });
        };
    }
    _page(pageRouteId: string, title: string, area: string, conventionName: string): IPageConfig {
        var viewName: string = area + "/views/" + conventionName + "View.htm";
        var viewModelName: string = area + "/viewmodels/" + conventionName + "ViewModel";

        var dfdShouldLoadVM = $.Deferred();
        var vmPromise = this._loadVM(viewModelName, dfdShouldLoadVM.promise());
        var dfdSourceLoaded = $.Deferred();
        var dfdVMLoaded = $.Deferred<PageViewModel>();
        

        return <IPageConfig>{
            id: pageRouteId,
            title: title,
            showElement: this._buildShow(vmPromise),
            hideElement: this._buildHide(vmPromise),
            withOnShow: this._buildWithOnShow(dfdShouldLoadVM, vmPromise),
            sourceOnShow: this._loadView(viewName),
            sourceLoaded: () => {
                vmPromise.done((vm: PageViewModel) => {
                    vm.SourceLoaded();
                });
            },
        };
    }
}

export = PageViewModel;