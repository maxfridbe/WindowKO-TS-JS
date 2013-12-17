import ko = require('App/lib/knockout')
import WindowViewModel = require('App/ViewModels/WindowViewModel')
class TemplateWindowViewModel extends WindowViewModel {
    constructor(templateId: string,
        public TemplateViewModel: any,
        title: string,
        width: number,
        height: number,
        locationX: number,
        locationY: number,
        stackingOrder: number=1,
        public Moveable: boolean= true,
        public Resizeable: boolean= true,
        visible:boolean = true) {
            super(title, width, height, locationX, locationY, stackingOrder, Moveable, Resizeable, visible);
            this.TemplateId = ko.observable(templateId);
        

    }

    TemplateId: KnockoutObservable<string>;
}
export = TemplateWindowViewModel;