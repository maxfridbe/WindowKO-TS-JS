import ko = require('App/lib/knockout')

class WindowViewModel implements IWindowViewModel {
    constructor(width: number,
        height: number,
        locationX: number,
        locationY: number,
        stackingOrder: number,
        templateId: string,
        title: string= "Title",
        public Moveable: boolean= true,
        public Resizeable: boolean= true) {

        this.Width = ko.observable(width);
        this.Height = ko.observable(height);
        this.LocationX = ko.observable(locationX);
        this.LocationY = ko.observable(locationY);
        this.StackingOrder = ko.observable(stackingOrder);
        this.TemplateId = ko.observable(templateId);
        this.Title = ko.observable(title);

    }


    Width: KnockoutObservable<number>;
    Height: KnockoutObservable<number>;
    LocationX: KnockoutObservable<number>;
    LocationY: KnockoutObservable<number>;
    StackingOrder: KnockoutObservable<number>;
    TemplateId: KnockoutObservable<string>;
    Title: KnockoutObservable<string>;
}
export = WindowViewModel;