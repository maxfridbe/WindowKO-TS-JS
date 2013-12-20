import ko = require('App/lib/knockout')

var registerClickDrag = function (element: Element, delataCallback: (dx: number, dy: number) => void): () => void {
    var oldMousePosX: number,
        oldMousePosY: number;
    var onMouseMove = function (mouse: MouseEvent) {
        delataCallback(mouse.clientX - oldMousePosX, mouse.clientY - oldMousePosY);
        oldMousePosX = mouse.clientX;
        oldMousePosY = mouse.clientY
    };
    var onMouseUp = function () {
        window.removeEventListener('mousemove', onMouseMove, true);
    };
    var onMouseDown = function (e: MouseEvent) {
        oldMousePosX = e.clientX;
        oldMousePosY = e.clientY;
        window.addEventListener('mousemove', onMouseMove, true);
    };

    element.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);
    return () => {
        window.removeEventListener('mouseup', onMouseUp, false);
        element.removeEventListener('mousedown', onMouseDown, false);
    };
};

ko.bindingHandlers['windowing'] = {
    globalZIndex: 42,
    init: function (element: HTMLElement,
        valueAccessor: () => IWindowingSettings,
        allBindingsAccessor: () => any,
        viewModel: any,
        bindingContext: KnockoutBindingContext) {
        var settings = valueAccessor();
        var windowViewModel = settings.WindowViewModel;
        var self = (<any>(ko.bindingHandlers['windowing']));

        var computed = ko.computed(() => {
            element.style.width = windowViewModel.Width() + 'px';
            element.style.height = windowViewModel.Height() + 'px';
            element.style.position = 'absolute';
            element.style.left = windowViewModel.LocationX() + 'px';
            element.style.top = windowViewModel.LocationY() + 'px';
            element.style.zIndex = windowViewModel.StackingOrder().toString();
        });

        var removeMove, removeResize;

        if (windowViewModel.Moveable()) {
            removeMove = registerClickDrag(element.querySelector(settings.MoveHandleSelector), (dx, dy) => {
                windowViewModel.LocationY(dy + windowViewModel.LocationY());
                windowViewModel.LocationX(dx + windowViewModel.LocationX());
            });
        }
        if (windowViewModel.Resizeable()) {
            removeResize = registerClickDrag(element.querySelector(settings.ResizeHandleSelector), (dx, dy) => {
                windowViewModel.Height(dy + windowViewModel.Height());
                windowViewModel.Width(dx + windowViewModel.Width());
            });
        }

        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            if (removeMove) removeMove();
            if (removeResize) removeResize();
        });
    }
}

export = ko;