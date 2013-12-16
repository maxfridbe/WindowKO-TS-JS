/// <reference path="scripts/typings/knockout/knockout.d.ts" />
import ko = require('App/lib/knockout')
import MainViewModel = require('App/ViewModels/MainViewModel')

export module Index {

    //setup
    ko.bindingHandlers['windowing'] = {
        globalZIndex: 42,
        init: function (element: HTMLElement, valueAccessor: () => IWindowViewModel, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
            var windowViewModel = valueAccessor();
            var self = (<any>(ko.bindingHandlers['windowing']));

            var computed = ko.computed(() => {
                element.style.width = windowViewModel.Width() + 'px';
                element.style.height = windowViewModel.Height() + 'px';
                element.style.position = 'absolute';
                element.style.left = windowViewModel.LocationX() + 'px';
                element.style.top = windowViewModel.LocationY() + 'px';
                element.style.zIndex = windowViewModel.StackingOrder().toString();
            });

            if (windowViewModel.Moveable) {
                var offY, offX;
                var divMove = function (mouse: MouseEvent) {
                    windowViewModel.LocationY(mouse.clientY - offY);
                    windowViewModel.LocationX(mouse.clientX - offX);
                };
                var mouseUp = function () {
                    window.removeEventListener('mousemove', divMove, true);
                };
                var mouseDown = function (e: MouseEvent) {
                    offY = e.clientY - element.offsetTop;
                    offX = e.clientX - element.offsetLeft;
                    window.addEventListener('mousemove', divMove, true);
                    windowViewModel.StackingOrder(++self.globalZIndex);
                };

                element.querySelector('.title').addEventListener('mousedown', mouseDown, false);
                window.addEventListener('mouseup', mouseUp, false);
            }


            if (windowViewModel.Resizeable) {
                var handleMove = function (mouse: MouseEvent) {
                    windowViewModel.Height(mouse.clientY - element.offsetTop);
                    windowViewModel.Width(mouse.clientX - element.offsetLeft);
                };
                var mouseUpHandle = function () {
                    window.removeEventListener('mousemove', handleMove, true);
                };
                var mouseDownHandle = function (e: MouseEvent) {
                    window.addEventListener('mousemove', handleMove, true);
                };

                element.querySelector('.handle').addEventListener('mousedown', mouseDownHandle, false);
                window.addEventListener('mouseup', mouseUpHandle, false);
            }
        }
    }

    //application
    var main = new MainViewModel()
    ko.applyBindings(main, document.getElementById("app"));
}