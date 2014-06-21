import ko = require('app/lib/knockout')

class WindowViewModel implements IWindowViewModel {
    constructor(
        title: string,
        width: number,
        height: number,
        locationX: number,
        locationY: number,
        stackingOrder: number,
        moveable: boolean= true,
        resizeable: boolean= true,
        visible: boolean = true) {

        this.Width = ko.observable(width);
        this.Height = ko.observable(height);
        this.LocationX = ko.observable(locationX);
        this.LocationY = ko.observable(locationY);
        this.StackingOrder = ko.observable(stackingOrder);
        this.Title = ko.observable(title);
        this.Visible = ko.observable(visible);
        this.Moveable = ko.observable(moveable);
        this.Resizeable = ko.observable(resizeable);
    }
    Moveable: KnockoutObservable<boolean>;
    Resizeable: KnockoutObservable<boolean>;
    Visible: KnockoutObservable<boolean>;
    Width: KnockoutObservable<number>;
    Height: KnockoutObservable<number>;
    LocationX: KnockoutObservable<number>;
    LocationY: KnockoutObservable<number>;
    StackingOrder: KnockoutObservable<number>;
    Title: KnockoutObservable<string>;

    Show() {
        this.Visible(true);
    }
    Hide() {
        this.Visible(false);
    }
}
export = WindowViewModel;