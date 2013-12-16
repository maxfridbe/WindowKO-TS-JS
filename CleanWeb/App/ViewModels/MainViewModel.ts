import ko = require('App/lib/knockout')
import WindowViewModel = require('App/ViewModels/WindowViewModel');

class MainViewModel {
    public Win1 = new WindowViewModel(100, 100, 20, 30, 1, "tmplhelpwindow","Moveable",true,false);
    public Win2 = new WindowViewModel(100, 220, 80, 100, 1, "tmplhelpwindow","Resizeable",false,true);
    constructor() { }
}
export = MainViewModel;