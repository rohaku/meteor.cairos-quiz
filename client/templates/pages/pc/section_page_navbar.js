/**
 * Created by Ciro on 15/9/21.
 */
Template.SectionPageNavbarPc.events({
    'click #logoutForTest': function (event) {
        FB.getLoginStatus(function(response){
            if (response.status === 'connected') {
                if(confirm("Logout FB?")){
                    FB.logout(function(){
                        console.log("FB had been logout!");
                    });
                }
            }else{
                console.log("Do nothing!");
            }
        });
    }
});