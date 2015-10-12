/**
 * Created by Ciro on 15/9/18.
 */
Template.SectionPageRewardPc.rendered = function(){
    try {
        FB.XFBML.parse();
    }catch(e) {
    }
};

Template.SectionPageRewardPc.helpers({
    "connectPage": function(){
        if(Router.current().params.resultBranch == "connect"){
            return true;
        }else{
            return false;
        }
    }
});