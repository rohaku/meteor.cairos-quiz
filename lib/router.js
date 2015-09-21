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


Router.configure({
    layoutTemplate: 'layout' + _routerDeviceType,
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', function(){
    this.render('mainPage' + _routerDeviceType);
},{
    name: 'quiz.home'
});

Router.route('/answer.html', function() {
    this.render('SectionPageAnswer' + _routerDeviceType);
},{
    name: 'answer.do'
});
Router.route('/result.html', function() {
    this.render('SectionPageResult' + _routerDeviceType);
}, {
    name: 'answer.result'
});
Router.route('/reward.html', function() {
    this.render('SectionPageReward' + _routerDeviceType);
}, {
    name: 'result.reward'
});
Router.route('/thanks.html', function() {
    this.render('SectionPageThanks' + _routerDeviceType);
}, {
    name: 'reward.thanks'
});

Router.route('/test', function () {
    var req = this.request;
    var res = this.response;

    var _postParams = req.body;

    res.setHeader("Content-Type", "application/json, charset=utf-8");

    HTTP.post( _HTTP_REQUEST_URLS_._TEST_URL_, {}, function(error, result){
        res.end(JSON.stringify(result.data) + '\n');
    });


}, {where: 'server'});
