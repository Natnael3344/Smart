// @ flow

import React from 'react';
import { cmsService } from './CmsServices';
import { ErrorToaster } from '../../helpers';
import {  CommonActionsCreator } from '../../actions/CommonActionCreators';

export const cmsActions = {
    cms,
    unload
};

/* ---- Action Types ---- */
export const cmsConstants = {
    CMS_REQUEST: 'CMS_REQUEST',
    CMS_SUCCESS: 'CMS_SUCCESS',
    CMS_FAILURE: 'CMS_FAILURE',
    CMS_UNLOAD : 'CMS_UNLOAD'
};

/* ---- CMS Function Start ---- */
function cms(page_slug) {
    
    return (dispatch) => {

       dispatch(CommonActionsCreator.fetching(cmsConstants.CMS_REQUEST));

        cmsService.cms(page_slug)
            .then(
                cms => {
                    if (cms.data.status === "success") {
                        dispatch(CommonActionsCreator.success(cmsConstants.CMS_SUCCESS, cms));
                    } else {
                         dispatch(CommonActionsCreator.error(cmsConstants.CMS_FAILURE, cms))
                    }
                },
                error => {
                    ErrorToaster(" Alert ", "Something went wrong !!!");                 
                }
            );
    };
}
/* ---- CMS Function Ends ---- */

function unload()
{
    return (dispatch) => {

        dispatch(CommonActionsCreator.fetching(cmsConstants.CMS_UNLOAD));
    }
}
    