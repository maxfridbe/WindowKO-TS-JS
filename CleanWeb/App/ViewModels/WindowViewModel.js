define(["require", "exports", 'App/lib/knockout'], function(require, exports, ko) {
    var WindowViewModel = (function () {
        function WindowViewModel(title, width, height, locationX, locationY, stackingOrder, moveable, resizeable, visible) {
            if (typeof moveable === "undefined") { moveable = true; }
            if (typeof resizeable === "undefined") { resizeable = true; }
            if (typeof visible === "undefined") { visible = true; }
            this.Width = ko.observable(width);
            this.Height = ko.observable(height);
            this.LocationX = ko.observable(locationX);
            this.LocationY = ko.observable(locationY);
            this.StackingOrder = ko.observable(stackingOrder);
            this.Title = ko.observable(title);
            this.Visible = ko.observable(visible);
            this.Moveable = ko.observable(moveable);
            this.Resizeable = ko.observable(resizeable);
        }
        WindowViewModel.prototype.Show = function () {
            this.Visible(true);
        };
        WindowViewModel.prototype.Hide = function () {
            this.Visible(false);
        };
        return WindowViewModel;
    })();
    
    return WindowViewModel;
});
//# sourceMappingURL=WindowViewModel.js.map
