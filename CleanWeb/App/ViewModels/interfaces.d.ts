interface IWindowingSettings {
    MoveHandleSelector: string;
    ResizeHandleSelector: string;
    WindowViewModel: IWindowViewModel;
}

interface IWindowViewModel {
    Width: KnockoutObservable<number>;
    Height: KnockoutObservable<number>;
    LocationX: KnockoutObservable<number>;
    LocationY: KnockoutObservable<number>;
    StackingOrder: KnockoutObservable<number>;
    Visible: KnockoutObservable<boolean>;
    Moveable: KnockoutObservable<boolean>;
    Resizeable: KnockoutObservable<boolean>;
    Show();
    Hide();
}

interface ITemplateDefinition { templateId: string; templatePath: string; }