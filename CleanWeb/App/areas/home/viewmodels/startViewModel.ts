import PageViewModel = require('App/framework/domain/PageViewModel');
import GridViewModel = require('App/framework/domain/GridViewModel');

class startViewModel extends PageViewModel{
    x = 3;
    SourceLoaded() { console.log('sourceloaded'); }
    Shown() { console.log("shown"); }
    Hidden() { console.log('Hidden'); }
    testGrid: IGridViewModel;
    constructor() {
        super();
        this.testGrid = new GridViewModel(<IGridDataAdapter>{
            GetConfiguration: function () {
                return <IGridConfiguration>{
                    PageCount: 2,
                    ColumnDefinitions: <IGridColumnDefinition[]>[
                        {
                            Title: 'First Name',
                            Key: 'FirstName',
                            Type: 'String',
                        },
                        {
                            Title: 'Last Name',
                            Key: 'LastName',
                            Type: 'String',
                        },
                        {
                            Title: 'Phone Number',
                            Key: 'PhoneNumber',
                            Type: 'Number',
                        },
                        {
                            Title: 'Address',
                            Key: 'Address',
                            Type: 'String',
                        },
                        {
                            Title: '',
                            Key: '',
                            Data: { text: 'Click Me', handler: function (Row:IGridRow) { console.log('hanlded');}},
                            Type:'Button',
                        }
                    ]
                };
            },
            GetData: function (pageNumber: number) {
                return <IGridRow[]>[
                    {
                        FirstName: 'Bob',
                        LastName: 'Dole',
                        PhoneNumber: 2245653199,
                        Address: '1234 Fake St.'
                    },
                    {
                        FirstName: 'Frank',
                        LastName: 'Doyle',
                        PhoneNumber: 2245653199,
                        Address: '1234 Fake St. 2'
                    },
                    {
                        FirstName: 'Boby',
                        LastName: 'bark',
                        PhoneNumber: 8475618582,
                        Address: '222 Fake St. 2'
                    },
                ];
            }
        });
    }
}

export = startViewModel;