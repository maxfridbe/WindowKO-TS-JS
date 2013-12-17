define(["require", "exports", 'App/ViewModels/WindowViewModel', 'App/ViewModels/TemplateWindowViewModel'], function(require, exports, WindowViewModel, TemplateWindowViewModel) {
    var MainViewModel = (function () {
        function MainViewModel() {
            this.Win1 = new WindowViewModel("Moveable", 100, 100, 20, 30, 1, true, false, false);
            this.Win2 = new WindowViewModel("Resizeable", 100, 220, 80, 100, 1, false, true, false);
            this.Win3 = new TemplateWindowViewModel("tmpl1", { name: 'hello' }, "Templated", 300, 300, 300, 300, 2, true, true, false);
        }
        MainViewModel.prototype.showalldialogs = function () {
            this.Win1.Show();
            this.Win2.Show();
            this.Win3.Show();
        };
        MainViewModel.prototype.hidealldialogs = function () {
            this.Win1.Hide();
            this.Win2.Hide();
            this.Win3.Hide();
        };
        return MainViewModel;
    })();
    
    return MainViewModel;
});
//# sourceMappingURL=MainViewModel.js.map
