/**
 * Created by Ciro on 15/9/14.
 */

var _routerDeviceType;
if (_deviceType.android || _deviceType.iPhone || _deviceType.iPad) {
	_routerDeviceType = "Mobile";
} else {
	_routerDeviceType = "Pc";
}


Router.configure({
	layoutTemplate: 'layout' + _routerDeviceType,
	loadingTemplate: 'loading',
	progressSpinner: false,
	notFoundTemplate: 'notFound'
});

Router.route('/', function() {
	this.render('mainPage' + _routerDeviceType);
});
if (_routerDeviceType == 'Pc') {
	Router.route('/answer.html', function() {
		this.render('SectionPageAnswerPC');
	});
};