// @flow 

import marthaApi from '../../../api/api';
import { config } from '../../../api/config';
import settingConstant from '../../../setting/Setting';

export const OTPService = {
    OTP,
    resendOTP,
	
};


/*----- OTP Verify Services Start -----*/
function OTP(otp, postdata) {

    const data = Object.assign({}, {
        personal_mobile:(postdata?.personal_mobile != undefined ) ? postdata?.personal_mobile: '',
        otp: otp,
        first_name: (postdata?.first_name != undefined ) ? postdata?.first_name: 'Fname',
        last_name: (postdata?.last_name != undefined ) ? postdata?.last_name: 'Lname',
    });
    
    return marthaApi.post(`${settingConstant.api_url}${config.endpoint.otpValidate}`,null,null,data).then(res => {
        return res;
    }).catch(error => {
        return Promise.reject(error);
    })


}

/*----- OTP Verify Services End -----*/



/*----- Resend OTP Services Start -----*/
function resendOTP(personal_mobile) {
    
    const data = Object.assign({}, {
        "personal_mobile": personal_mobile,   
    })
      
    return marthaApi.post(`${settingConstant.api_url}${config.endpoint.otpGenerate}`,null,null,data).then(res => {
        return res;
    }).catch(error => {
        return Promise.reject(error);
    })

}

/*----- Resend OTP Services End -----*/
