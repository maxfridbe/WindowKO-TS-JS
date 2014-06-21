interface IAreaManifest {
    Key: string;
    Title: string;
    UrlToken: string;
    InitialModule: string;
    LoadStyle?: string;
} 

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
    Rows: KnockoutObservableArray<IGridRow>;
    Configuration: KnockoutObservable<IGridConfiguration>;
    CurrentPage: KnockoutObservable<number>;
}

interface IGridDataAdapter {
    GetConfiguration(): JQueryPromise<IGridConfiguration>;
    GetData(pageNumber: number): JQueryPromise<IGridRow[]>;
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
interface IGridSearch {
    Key: string;
    Value: string;
    Page: number;
    PageSize: number;
}
interface IGridRow {
}



