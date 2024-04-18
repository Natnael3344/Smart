// @flow 


import marthaApi from '../../api/api';
import settingConstant from '../../setting/Setting';
import { config } from '../../api/config';

export const cmsService = {
    cms,
};


/*----- CMS Services Start -----*/
function cms(page_slug) {


    const data = Object.assign({}, {
        "slug": page_slug,   
    })
      
    return marthaApi.post(`${settingConstant.api_url}${config.endpoint.cmsDetail}`,null,null,data).then(res => {
        return res;
    }).catch(error => {
        return Promise.reject(error);
    })


}

/*----- CMS Services End -----*/