import PageViewModel = require('App/framework/domain/PageViewModel');

class startViewModel extends PageViewModel{
    x = 3;
    SourceLoaded() { console.log('sourceloaded'); }
    Shown() { console.log("shown"); }
    Hidden() { console.log('Hidden');}
}

export = startViewModel;