define(["require", "exports", 'app/lib/knockout'], function(require, exports, ko) {
    var GridViewModel = (function () {
        function GridViewModel(adapter) {
            var _this = this;
            this.Rows = ko.observableArray();
            this.Configuration = ko.observable();
            this.CurrentPage = ko.observable(1);
            adapter.GetConfiguration().done(function (config) {
                _this.Configuration(config);
            });
            adapter.GetData(this.CurrentPage()).done(function (data) {
                _this.Rows(data);
            });
        }
        return GridViewModel;
    })();
    
    return GridViewModel;
});
