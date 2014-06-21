define(["require", "exports", 'app/lib/knockout'], function(require, exports, ko) {
    var registerClickDrag = function (element, delataCallback) {
        var oldMousePosX, oldMousePosY;
        var onMouseMove = function (mouse) {
            delataCallback(mouse.clientX - oldMousePosX, mouse.clientY - oldMousePosY);
            oldMousePosX = mouse.clientX;
            oldMousePosY = mouse.clientY;
        };
        var onMouseUp = function () {
            window.removeEventListener('mousemove', onMouseMove, true);
        };
        var onMouseDown = function (e) {
            oldMousePosX = e.clientX;
            oldMousePosY = e.clientY;
            window.addEventListener('mousemove', onMouseMove, true);
        };

        element.addEventListener('mousedown', onMouseDown, false);
        window.addEventListener('mouseup', onMouseUp, false);
        return function () {
            window.removeEventListener('mouseup', onMouseUp, false);
            element.removeEventListener('mousedown', onMouseDown, false);
        };
    };

    ko.bindingHandlers['windowing'] = {
        globalZIndex: 42,
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var settings = valueAccessor();
            var windowViewModel = settings.WindowViewModel;
            var self = (ko.bindingHandlers['windowing']);

            var computed = ko.computed(function () {
                element.style.width = windowViewModel.Width() + 'px';
                element.style.height = windowViewModel.Height() + 'px';
                element.style.position = 'absolute';
                element.style.left = windowViewModel.LocationX() + 'px';
                element.style.top = windowViewModel.LocationY() + 'px';
                element.style.zIndex = windowViewModel.StackingOrder().toString();
            });

            var removeMove, removeResize;

            if (windowViewModel.Moveable()) {
                removeMove = registerClickDrag(element.querySelector(settings.MoveHandleSelector), function (dx, dy) {
                    windowViewModel.LocationY(dy + windowViewModel.LocationY());
                    windowViewModel.LocationX(dx + windowViewModel.LocationX());
                });
            }
            if (windowViewModel.Resizeable()) {
                removeResize = registerClickDrag(element.querySelector(settings.ResizeHandleSelector), function (dx, dy) {
                    windowViewModel.Height(dy + windowViewModel.Height());
                    windowViewModel.Width(dx + windowViewModel.Width());
                });
            }

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                if (removeMove)
                    removeMove();
                if (removeResize)
                    removeResize();
            });
        }
    };

    
    return ko;
});
