interface IWindowViewModel {
    Width: KnockoutObservable<number>;
    Height: KnockoutObservable<number>;
    LocationX: KnockoutObservable<number>;
    LocationY: KnockoutObservable<number>;
    StackingOrder: KnockoutObservable<number>;
    TemplateId: KnockoutObservable<string>;
    Moveable: boolean;
    Resizeable: boolean;
}