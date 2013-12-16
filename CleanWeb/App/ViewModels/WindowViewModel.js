define(["require", "exports", 'App/lib/knockout'], function(require, exports, ko) {
    var WindowViewModel = (function () {
        function WindowViewModel(width, height, locationX, locationY, stackingOrder, templateId, title, Moveable, Resizeable) {
            if (typeof title === "undefined") { title = "Title"; }
            if (typeof Moveable === "undefined") { Moveable = true; }
            if (typeof Resizeable === "undefined") { Resizeable = true; }
            this.Moveable = Moveable;
            this.Resizeable = Resizeable;
            this.Width = ko.observable(width);
            this.Height = ko.observable(height);
            this.LocationX = ko.observable(locationX);
            this.LocationY = ko.observable(locationY);
            this.StackingOrder = ko.observable(stackingOrder);
            this.TemplateId = ko.observable(templateId);
            this.Title = ko.observable(title);
        }
        return WindowViewModel;
    })();
    
    return WindowViewModel;
});
//# sourceMappingURL=WindowViewModel.js.map
