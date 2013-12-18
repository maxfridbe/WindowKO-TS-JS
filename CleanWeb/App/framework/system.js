define(["require", "exports", 'App/lib/jquery'], function(require, exports, $) {
    var system;
    (function (system) {
        var $head = $('head');
        function LoadTemplate(templateId, templatePath) {
            if (!document.getElementById(templateId)) {
                return $.get(templatePath).done(function (d) {
                    var $elem = $(d);
                    $head.append($elem);
                });
            }
            return $.Deferred().resolve().promise();
        }
        system.LoadTemplate = LoadTemplate;
        ;

        function LoadTemplates(definitions) {
            var templatesPromise = $.map(definitions, function (elem) {
                return LoadTemplate(elem.templateId, elem.templatePath);
            });

            var dfdTemplates = $.Deferred();
            $.when.apply($, templatesPromise).done(function () {
                dfdTemplates.resolve();
            });

            return dfdTemplates.promise();
        }
        system.LoadTemplates = LoadTemplates;
        ;
    })(system || (system = {}));
    
    return system;
});
//# sourceMappingURL=system.js.map
