// @flow 

import marthaApi from '../../../api/api';
import settingConstant from '../../../setting/Setting';
import { config } from '../../../api/config';

export const registrationNameService = {
    registrationName
};


/*----- registration Services Start -----*/
function registrationName(values) {
    
    const data = Object.assign({}, {
        "personal_mobile": values.personal_mobile,   
    })
      
    return marthaApi.post(`${settingConstant.api_url}${config.endpoint.otpGenerate}`,null,null,data).then(res => {
        return res;
    }).catch(error => {
        return Promise.reject(error);
    })

}

/*----- registration Services End -----*/
