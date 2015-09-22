/**
 * Created by Ciro on 15/9/14.
 */

_DEVICE_TYPE_ = {
    _PC_: "Pc",
    _MOBILE_: "Mobile"
};

var _routerDeviceType;
if( _deviceType.android || _deviceType.iPhone || _deviceType.iPad){
    _routerDeviceType = _DEVICE_TYPE_._MOBILE_;
}else{
    _routerDeviceType = _DEVICE_TYPE_._PC_;
}

/**
 * =================================== 客户端路由 ===================================
 */

//路由总配置
Router.configure({
    layoutTemplate: 'layout' + _routerDeviceType,
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

//首页
Router.route('/', function(){
    this.render('mainPage' + _routerDeviceType);
},{
    name: 'quiz.home'
});

//答题
Router.route('/answer.html', function() {
    this.render('SectionPageAnswer' + _routerDeviceType);
},{
    name: 'answer.do'
});

//答题结果
Router.route('/result/:answerRange', function() {
    this.render('SectionPageResult' + _routerDeviceType);
}, {
    name: 'answer.result'
});

//答题后的code获取
Router.route('/reward/:resultBranch', function() {
    //this.layout('SectionPageReward' + _routerDeviceType);
    this.render('SectionPageReward' + _routerDeviceType);

    if(this.params.resultBranch === "connect"){
        this.render('quizCompleteConnect' + _routerDeviceType, {to: "quizComplete"});
    }else{
        this.render('quizCompleteGetCode' + _routerDeviceType, {to: "quizComplete"});
    }
}, {
    name: 'result.reward'
});
Router.route('/thanks.html', function() {
    this.render('SectionPageThanks' + _routerDeviceType);
}, {
    name: 'reward.thanks'
});
Router.route('/firstclaim.html', function() {
    this.render('SectionPageFirstclaim' + _routerDeviceType);
}, {
    name: 'facebook.firstclaim'
});
Router.route('/claim.html', function() {
    this.render('SectionPageClaim' + _routerDeviceType);
}, {
    name: 'facebook.claim'
});

/**
 * =================================== 服务端路由 ===================================
 */
Router.route('/test', function () {
    var req = this.request;
    var res = this.response;

    var _postParams = req.body;

    res.setHeader("Content-Type", "application/json, charset=utf-8");

    HTTP.post( _HTTP_REQUEST_URLS_._TEST_URL_, {}, function(error, result){
        res.end(JSON.stringify(result.data) + '\n');
    });


}, {where: 'server'});
