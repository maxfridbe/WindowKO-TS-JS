define(["require", "exports", 'App/lib/knockout', 'App/ViewModels/MainViewModel'], function(require, exports, ko, MainViewModel) {
    (function (Index) {
        //setup
        ko.bindingHandlers['windowing'] = {
            globalZIndex: 42,
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var windowViewModel = valueAccessor();
                var self = (ko.bindingHandlers['windowing']);

                var computed = ko.computed(function () {
                    element.style.width = windowViewModel.Width() + 'px';
                    element.style.height = windowViewModel.Height() + 'px';
                    element.style.position = 'absolute';
                    element.style.left = windowViewModel.LocationX() + 'px';
                    element.style.top = windowViewModel.LocationY() + 'px';
                    element.style.zIndex = windowViewModel.StackingOrder().toString();
                });

                if (windowViewModel.Moveable) {
                    var offY, offX;
                    var divMove = function (mouse) {
                        windowViewModel.LocationY(mouse.clientY - offY);
                        windowViewModel.LocationX(mouse.clientX - offX);
                    };
                    var mouseUp = function () {
                        window.removeEventListener('mousemove', divMove, true);
                    };
                    var mouseDown = function (e) {
                        offY = e.clientY - element.offsetTop;
                        offX = e.clientX - element.offsetLeft;
                        window.addEventListener('mousemove', divMove, true);
                        windowViewModel.StackingOrder(++self.globalZIndex);
                    };

                    element.querySelector('.title').addEventListener('mousedown', mouseDown, false);
                    window.addEventListener('mouseup', mouseUp, false);
                }

                if (windowViewModel.Resizeable) {
                    var handleMove = function (mouse) {
                        windowViewModel.Height(mouse.clientY - element.offsetTop);
                        windowViewModel.Width(mouse.clientX - element.offsetLeft);
                    };
                    var mouseUpHandle = function () {
                        window.removeEventListener('mousemove', handleMove, true);
                    };
                    var mouseDownHandle = function (e) {
                        window.addEventListener('mousemove', handleMove, true);
                    };

                    element.querySelector('.handle').addEventListener('mousedown', mouseDownHandle, false);
                    window.addEventListener('mouseup', mouseUpHandle, false);
                }
            }
        };

        //application
        var main = new MainViewModel();
        ko.applyBindings(main, document.getElementById("app"));
    })(exports.Index || (exports.Index = {}));
    var Index = exports.Index;
});
//# sourceMappingURL=index.js.map
