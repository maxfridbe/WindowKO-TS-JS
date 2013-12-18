define(["require", "exports", 'App/lib/jquery'], function(require, exports, $) {
    var PageViewModel = (function () {
        function PageViewModel() {
        }
        PageViewModel.prototype.SourceLoaded = function () {
        };
        PageViewModel.prototype.Shown = function () {
        };
        PageViewModel.prototype.Hidden = function () {
        };

        PageViewModel.prototype._onPageIn = function (page, callback) {
            $(page.element).hide().fadeIn(1000, callback);
        };
        PageViewModel.prototype._onPageOut = function (page, callback) {
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
        };
        PageViewModel.prototype._loadView = function (viewModule) {
            return function (page, callback) {
                require([viewModule], function (viewString) {
                    $(page.element).html(viewString);
                    callback();
                });
            };
        };

        PageViewModel.prototype._loadVM = function (viewModelName, dfdVMLoaded) {
            return function (callback) {
                require([viewModelName], function (mod) {
                    var viewModel = new mod();
                    dfdVMLoaded.resolve(viewModel);
                    callback(viewModel);
                });
            };
        };
        PageViewModel.prototype._buildShow = function (vmPromise) {
            var _this = this;
            return function (page, callback) {
                vmPromise.done(function (vm) {
                    _this._onPageIn(page, function () {
                        if (callback)
                            callback();
                        vm.Shown();
                    });
                });
            };
        };
        PageViewModel.prototype._buildHide = function (vmPromise) {
            var _this = this;
            return function (page, callback) {
                vmPromise.done(function (vm) {
                    _this._onPageOut(page, function () {
                        if (callback)
                            callback();
                        vm.Hidden();
                    });
                });
            };
        };
        PageViewModel.prototype._page = function (pageRouteId, title, area, conventionName) {
            var viewName = area + "/views/" + conventionName + "View.htm";
            var viewModelName = area + "/viewmodels/" + conventionName + "ViewModel";

            var dfdSourceLoaded = $.Deferred();
            var dfdVMLoaded = $.Deferred();

            var vmPromise = dfdVMLoaded.promise();

            return {
                id: pageRouteId,
                title: title,
                showElement: this._buildShow(vmPromise),
                hideElement: this._buildHide(vmPromise),
                withOnShow: this._loadVM(viewModelName, dfdVMLoaded),
                sourceOnShow: viewName,
                sourceLoaded: function () {
                    vmPromise.done(function (vm) {
                        vm.SourceLoaded();
                    });
                }
            };
        };
        return PageViewModel;
    })();

    
    return PageViewModel;
});
//# sourceMappingURL=PageViewModel.js.map
