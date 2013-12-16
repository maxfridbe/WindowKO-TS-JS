define(["require", "exports", 'App/ViewModels/WindowViewModel'], function(require, exports, WindowViewModel) {
    var MainViewModel = (function () {
        function MainViewModel() {
            this.Win1 = new WindowViewModel(100, 100, 20, 30, 1, "tmplhelpwindow", "Moveable", true, false);
            this.Win2 = new WindowViewModel(100, 220, 80, 100, 1, "tmplhelpwindow", "Resizeable", false, true);
        }
        return MainViewModel;
    })();
    
    return MainViewModel;
});
//# sourceMappingURL=MainViewModel.js.map
