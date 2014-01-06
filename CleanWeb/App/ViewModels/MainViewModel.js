var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'App/ViewModels/WindowViewModel', 'App/ViewModels/TemplateWindowViewModel', 'App/framework/domain/PageViewModel'], function(require, exports, WindowViewModel, TemplateWindowViewModel, PageViewModel) {
    var MainViewModel = (function (_super) {
        __extends(MainViewModel, _super);
        function MainViewModel() {
            _super.call(this);
            this.Win3 = new TemplateWindowViewModel("tmpl1", { name: 'hello' }, "Templated", 300, 300, 300, 300, 2, true, true, false);
            this.Pages = [this._page("start", "Title", 'app/areas/home', 'start')];
            this.Navigation = [{ Href: '#start', Title: 'Home' }];
            //this.Pages.push();
        }
        MainViewModel.prototype.showalldialogs = function () {
            this.Win3.Show();
        };
        MainViewModel.prototype.hidealldialogs = function () {
            this.Win3.Hide();
        };
        return MainViewModel;
    })(PageViewModel);
    
    return MainViewModel;
});
//# sourceMappingURL=MainViewModel.js.map
