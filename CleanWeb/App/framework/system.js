define(["require", "exports", 'app/lib/jquery', 'parameters'], function(require, exports, $, parameters) {
    var system;
    (function (system) {
        var $head = $('head');
        function LoadTemplateAsync(templateId, templatePath) {
            templatePath += "?v=" + parameters.version;
            if (!document.getElementById(templateId)) {
                return $.get(templatePath).done(function (d) {
                    var $elem = $(d);
                    $head.append($elem);
                });
            }
            return $.Deferred().resolve().promise();
        }
        system.LoadTemplateAsync = LoadTemplateAsync;
        ;

        function LoadTemplatesAsync(definitions) {
            var templatesPromise = $.map(definitions, function (elem) {
                return LoadTemplateAsync(elem.templateId, elem.templatePath);
            });

            var dfdTemplates = $.Deferred();
            $.when.apply($, templatesPromise).done(function () {
                dfdTemplates.resolve();
            });

            return dfdTemplates.promise();
        }
        system.LoadTemplatesAsync = LoadTemplatesAsync;
        ;

        function RequireAsync(moduleName) {
            var dfdModule = $.Deferred();

            require([moduleName], dfdModule.resolve, dfdModule.fail);

            return dfdModule.promise();
        }
        system.RequireAsync = RequireAsync;
        ;

        function LoadStyleAsync(path) {
            path += '?v=' + parameters.version;
            var dfdLink = $.Deferred();
            if (!document.getElementById(path)) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.id = path;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = path;
                link.media = 'all';
                link.onload = dfdLink.resolve;
                link.onerror = dfdLink.reject;
                head.appendChild(link);
            }
            return dfdLink.promise();
        }
        system.LoadStyleAsync = LoadStyleAsync;
    })(system || (system = {}));
    
    return system;
});
