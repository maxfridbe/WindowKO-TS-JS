define(["require", "exports", 'App/lib/knockout'], function(require, exports, ko) {
    var WindowViewModel = (function () {
        function WindowViewModel(title, width, height, locationX, locationY, stackingOrder, Moveable, Resizeable, visible) {
            if (typeof Moveable === "undefined") { Moveable = true; }
            if (typeof Resizeable === "undefined") { Resizeable = true; }
            if (typeof visible === "undefined") { visible = true; }
            this.Moveable = Moveable;
            this.Resizeable = Resizeable;
            this.Width = ko.observable(width);
            this.Height = ko.observable(height);
            this.LocationX = ko.observable(locationX);
            this.LocationY = ko.observable(locationY);
            this.StackingOrder = ko.observable(stackingOrder);
            this.Title = ko.observable(title);
            this.Visible = ko.observable(visible);
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
