/**
 * Created by Ciro on 15/9/24.
 */
__ENVCONFIG__ = {
    'development':{
        FB_APP_ID : '1494613100852445',
        FB_APP_SECR: ''
    },
    'production':{
        FB_APP_ID : '1629952820566627',
        FB_APP_SECR: ''
    }
}

if(process.env.NODE_ENV == 'production' || process.env.PRODUCTION){
    _ENV_ = 'production';
}else{
    _ENV_ = 'development';
}

FB_DEVELOPER_INFO = __ENVCONFIG__[_ENV_];