class GridViewModel implements IGridViewModel {

    Rows: IGridRow[];
    Configuration: IGridConfiguration;
    CurrentPage: number=1;
    constructor(adapter: IGridDataAdapter) {
        this.Configuration = adapter.GetConfiguration();
        this.Rows = adapter.GetData(this.CurrentPage);
    }
}
export = GridViewModel;