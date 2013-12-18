import $ = require('App/lib/jquery')
 module system {
    var $head = $('head');
    export function LoadTemplate(templateId: string, templatePath: string): JQueryPromise<any> {
        if (!document.getElementById(templateId)) {
            return $.get(templatePath).done((d) => {
                var $elem = $(d);
                $head.append($elem);
            });
        }
        return $.Deferred().resolve().promise();

    };

    export function LoadTemplates(definitions: ITemplateDefinition[]): JQueryPromise<any> {

        var templatesPromise = $.map(definitions, (elem) => {
            return LoadTemplate(elem.templateId, elem.templatePath);
        });

        var dfdTemplates = $.Deferred();
        $.when.apply($, templatesPromise).done(() => {
            dfdTemplates.resolve();
        });

        return dfdTemplates.promise();
    };
}
export = system;