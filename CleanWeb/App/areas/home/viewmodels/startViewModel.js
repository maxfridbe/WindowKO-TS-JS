var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'app/framework/domain/PageViewModel', 'app/framework/domain/GridViewModel'], function(require, exports, PageViewModel, GridViewModel) {
    var startViewModel = (function (_super) {
        __extends(startViewModel, _super);
        function startViewModel() {
            _super.call(this);
            this.x = 3;
            this.testGrid = new GridViewModel({
                GetConfiguration: function () {
                    var dfdResult = $.Deferred();
                    var cfg = {
                        PageCount: 2,
                        ColumnDefinitions: [
                            {
                                Title: 'First Name',
                                Key: 'FirstName',
                                Type: 'String'
                            },
                            {
                                Title: 'Last Name',
                                Key: 'LastName',
                                Type: 'String'
                            },
                            {
                                Title: 'Phone Number',
                                Key: 'PhoneNumber',
                                Type: 'Number'
                            },
                            {
                                Title: 'Address',
                                Key: 'Address',
                                Type: 'String'
                            },
                            {
                                Title: '',
                                Key: '',
                                Data: { text: 'Click Me', handler: function (Row) {
                                        console.log('hanlded');
                                    } },
                                Type: 'Button'
                            }
                        ]
                    };
                    dfdResult.resolve(cfg);
                    return dfdResult.promise();
                },
                GetData: function (pageNumber) {
                    var dfdResult = $.Deferred();
                    var rows = [
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
                        }
                    ];
                    dfdResult.resolve(rows);
                    return dfdResult.promise();
                }
            });
        }
        startViewModel.prototype.SourceLoaded = function () {
            console.log('sourceloaded');
        };
        startViewModel.prototype.Shown = function () {
            console.log("shown");
        };
        startViewModel.prototype.Hidden = function () {
            console.log('Hidden');
        };
        return startViewModel;
    })(PageViewModel);

    
    return startViewModel;
});
