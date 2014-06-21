import ko = require('app/lib/knockout');

class GridViewModel implements IGridViewModel {

    Rows: KnockoutObservableArray<IGridRow> = ko.observableArray<IGridRow>();
    Configuration: KnockoutObservable<IGridConfiguration> = ko.observable<IGridConfiguration>();
    CurrentPage: KnockoutObservable<number> = ko.observable(1);
    constructor(adapter: IGridDataAdapter) {

        adapter.GetConfiguration().done((config) => {
            this.Configuration(config);
        });
        adapter.GetData(this.CurrentPage()).done((data) => {
            this.Rows(data);
        });
    }
}
export = GridViewModel;