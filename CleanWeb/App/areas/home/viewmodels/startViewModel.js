var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'App/framework/domain/PageViewModel'], function(require, exports, PageViewModel) {
    var startViewModel = (function (_super) {
        __extends(startViewModel, _super);
        function startViewModel() {
            _super.apply(this, arguments);
            this.x = 3;
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
//# sourceMappingURL=startViewModel.js.map
