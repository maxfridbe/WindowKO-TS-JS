import $ = require('app/lib/jquery')
import parameters = require('parameters')

 module system {
    var $head = $('head');
    export function LoadTemplateAsync(templateId: string, templatePath: string): JQueryPromise<any> {
        templatePath += "?v=" + parameters.version;
        if (!document.getElementById(templateId)) {
            return $.get(templatePath).done((d) => {
                var $elem = $(d);
                $head.append($elem);
            });
        }
        return $.Deferred().resolve().promise();

    };

    export function LoadTemplatesAsync(definitions: ITemplateDefinition[]): JQueryPromise<any> {

        var templatesPromise = $.map(definitions, (elem) => {
            return LoadTemplateAsync(elem.templateId, elem.templatePath);
        });

        var dfdTemplates = $.Deferred();
        $.when.apply($, templatesPromise).done(() => {
            dfdTemplates.resolve();
        });

        return dfdTemplates.promise();
    };

    export function RequireAsync<T>(moduleName: string): JQueryPromise<T> {
        var dfdModule = $.Deferred<T>();

        require([moduleName], dfdModule.resolve, dfdModule.fail);

        return dfdModule.promise();
    };

    export function LoadStyleAsync(path: string): JQueryPromise<Event> {
        path += '?v=' + parameters.version;
        var dfdLink = $.Deferred<Event>();
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
}
export = system;