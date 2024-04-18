// @ flow
import {trackComplaintService} from './TrackComplaintServices';
import {ErrorToaster} from '../../../helpers';
import {CommonActionsCreator} from '../../../actions/CommonActionCreators';

export const trackComplaintActions = {
  viewComplaintList,
  unload,
};

/* ---- Action Types ---- */
export const trackComplaintConstants = {
  LIST_REQUEST: 'LIST_REQUEST',
  LIST_SUCCESS: 'LIST_SUCCESS',
  LIST_FAILURE: 'LIST_FAILURE',
  LIST_UNLOAD: 'LIST_UNLOAD',
};

/* ---- LIST Function Start ---- */
function viewComplaintList(pdata) {
  return dispatch => {
    dispatch(
      CommonActionsCreator.fetching(trackComplaintConstants.LIST_REQUEST),
    );

    trackComplaintService.viewComplaintList(pdata).then(
      list => {
        if (list.data.status === 'success') {
          dispatch(
            CommonActionsCreator.success(
              trackComplaintConstants.LIST_SUCCESS,
              list.data,
            ),
          );
        } else {
          dispatch(
            CommonActionsCreator.error(
              trackComplaintConstants.LIST_FAILURE,
              list,
            ),
          );
        }
      },
      error => {
        ErrorToaster(' Alert ', 'Something went wrong !!!');
      },
    );
  };
}
/* ---- LIST Function Ends ---- */

function unload() {
  return dispatch => {
    dispatch(
      CommonActionsCreator.fetching(trackComplaintConstants.LIST_UNLOAD),
    );
  };
}
