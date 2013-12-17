import ko = require('App/lib/knockout')
import WindowViewModel = require('App/ViewModels/WindowViewModel');
import TemplateWindowViewModel = require('App/ViewModels/TemplateWindowViewModel');

class MainViewModel {
    public Win1 = new WindowViewModel("Moveable", 100, 100, 20, 30, 1, true, false, false);
    public Win2 = new WindowViewModel("Resizeable", 100, 220, 80, 100, 1, false, true, false);
    public Win3 = new TemplateWindowViewModel("tmpl1", { name: 'hello' }, "Templated", 300, 300, 300, 300, 2, true, true, false);
    constructor() { }

    showalldialogs() {
        this.Win1.Show();
        this.Win2.Show();
        this.Win3.Show();
    }
    hidealldialogs() {
        this.Win1.Hide();
        this.Win2.Hide();
        this.Win3.Hide();
    }
}
export = MainViewModel;