/**
 * Created by Ciro on 15/9/24.
 */
Template.checkGetCodeStatus.rendered = function () {
    //触发模板渲染加载时的事件
    invokeAfterLoad();
};

Template.checkGetCodeStatus.helpers({
    "ajaxExecComplete": function () {
        return Session.get("checkQuizUserOver");
    },
    "makeFirstPage": function () {
        console.log(checkResult);
        if (checkResult.referees.length == 0) {
            return true;
        } else {
            return false;
        }
    },
    "makeNormalPage": function () {
        if (checkResult.referees.length < 10 && checkResult.referees.length >= 1) {
            return true;
        } else {
            return false;
        }
    },
    "makeLastPage": function () {
        if (checkResult.referees.length >= 10) {
            return true;
        } else {
            return false;
        }
    }

});

//此方法表示仅当当前模板被渲染加载时执行的逻辑
var invokeAfterLoad = function () {
    Meteor.defer(function () {
        Meteor.call("checkGetStatusToGoPage");
    });
};