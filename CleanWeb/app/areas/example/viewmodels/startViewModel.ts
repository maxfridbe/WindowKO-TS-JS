import PageViewModel = require('app/framework/domain/PageViewModel');
import GridViewModel = require('app/framework/domain/GridViewModel');
import WindowViewModel = require('app/lib/viewmodels/WindowViewModel');
import TemplateWindowViewModel = require('app/lib/viewmodels/TemplateWindowViewModel');


class startViewModel extends PageViewModel{
    x = 3;
    Win3 = new TemplateWindowViewModel("tmpl1", { name: 'hello' }, "Templated", 300, 300, 300, 300, 2, true, true, false);
    ShowWin = () => { this.Win3.Show()};
    SourceLoaded() { console.log('sourceloaded'); }
    Shown() { console.log("shown"); }
    Hidden() { console.log('Hidden'); }
    constructor() {
        super();
    }
}

export = startViewModel;