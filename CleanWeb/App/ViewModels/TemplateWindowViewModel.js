var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'App/lib/knockout', 'App/ViewModels/WindowViewModel'], function(require, exports, ko, WindowViewModel) {
    var TemplateWindowViewModel = (function (_super) {
        __extends(TemplateWindowViewModel, _super);
        function TemplateWindowViewModel(templateId, TemplateViewModel, title, width, height, locationX, locationY, stackingOrder, Moveable, Resizeable, visible) {
            if (typeof stackingOrder === "undefined") { stackingOrder = 1; }
            if (typeof Moveable === "undefined") { Moveable = true; }
            if (typeof Resizeable === "undefined") { Resizeable = true; }
            if (typeof visible === "undefined") { visible = true; }
            _super.call(this, title, width, height, locationX, locationY, stackingOrder, Moveable, Resizeable, visible);
            this.TemplateViewModel = TemplateViewModel;
            this.Moveable = Moveable;
            this.Resizeable = Resizeable;
            this.TemplateId = ko.observable(templateId);
        }
        return TemplateWindowViewModel;
    })(WindowViewModel);
    
    return TemplateWindowViewModel;
});
//# sourceMappingURL=TemplateWindowViewModel.js.map
