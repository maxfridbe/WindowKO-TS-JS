interface IWindowViewModel {
    Width: KnockoutObservable<number>;
    Height: KnockoutObservable<number>;
    LocationX: KnockoutObservable<number>;
    LocationY: KnockoutObservable<number>;
    StackingOrder: KnockoutObservable<number>;
    Visible: KnockoutObservable<boolean>;
    Moveable: boolean;
    Resizeable: boolean;
    Show();
    Hide();
}