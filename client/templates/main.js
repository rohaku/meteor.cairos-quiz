/**
 StartUp Functions Can be edited here
 Created By Ciro
 */

//Handlebars注册全局Helper标签(全局模板变量判断客户端类型)
Handlebars.registerHelper('isMobile', function () {
    if (_deviceType.android || _deviceType.iPhone || _deviceType.iPad) {
        return true;
    } else {
        return false;
    }
});
