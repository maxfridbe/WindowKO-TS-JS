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

interface IPageNavigation {
    Href: string;
    Title: string;
}

interface IGridViewModel {
    Rows: IGridRow[];
    Configuration: IGridConfiguration;
    CurrentPage: number;
}

interface IGridDataAdapter {
    GetConfiguration(): IGridConfiguration;
    GetData(pageNumber: number): IGridRow[];
}
interface IGridConfiguration {
    PageCount: number;
    ColumnDefinitions: IGridColumnDefinition[];
}
interface IGridColumnDefinition {
    Title: string;
    Key: string;
    Type: string;
}

interface IGridRow {
}



