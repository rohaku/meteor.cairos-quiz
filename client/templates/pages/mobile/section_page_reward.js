/**
 * Created by Jenny on 15/10/09.
 */
Template.SectionPageRewardMobile.rendered = function(){
    try {
        FB.XFBML.parse();
    }catch(e) {
    }
};

Template.SectionPageRewardMobile.helpers({
	"connectPage":function(){
        console.log(Router.current().params);
		if(Router.current().params.resultBranch == 'connect'){
			return true;
		}else{
			return false;
		}
	}
})