import ko = require('app/lib/knockout')
import WindowViewModel = require('app/lib/viewmodels/WindowViewModel')
class TemplateWindowViewModel extends WindowViewModel {
    constructor(templateId: string,
        public TemplateViewModel: any,
        title: string,
        width: number,
        height: number,
        locationX: number,
        locationY: number,
        stackingOrder: number=1,
        moveable: boolean= true,
        resizeable: boolean= true,
        visible:boolean = true) {
            super(title, width, height, locationX, locationY, stackingOrder, moveable, resizeable, visible);
            this.TemplateId = ko.observable(templateId);
        

    }

    TemplateId: KnockoutObservable<string>;
}
export = TemplateWindowViewModel;