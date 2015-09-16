/**
 * Created by Ciro on 15/9/14.
 */
if (Meteor.isServer) {
    Meteor.startup(function () {
        _HTTP_REQUEST_URLS_ = {
            '_TEST_URL_': 'http://jsonplaceholder.typicode.com/posts'
        };
    });
}