import ko = require('App/lib/knockout')
import WindowViewModel = require('App/ViewModels/WindowViewModel');
import TemplateWindowViewModel = require('App/ViewModels/TemplateWindowViewModel');
import PageViewModel = require('App/framework/domain/PageViewModel');

class MainViewModel extends PageViewModel{
    public Win3 = new TemplateWindowViewModel("tmpl1", { name: 'hello' }, "Templated", 300, 300, 300, 300, 2, true, true, false);
    constructor() {
        super();
        this.Pages = [this._page("start","Title",'app/areas/home','start')];

        this.Pages.push();
    }

    showalldialogs() {
        this.Win3.Show();
    }
    hidealldialogs() {
        this.Win3.Hide();
    }

    public Pages: IPageConfig[];
}
export = MainViewModel;