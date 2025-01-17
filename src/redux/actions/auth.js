import {getObjByKey} from '../../utils/Storage';
import {AUTH_STATUS} from '../types';
import { ADD_Item, Remove_Item } from '../types';

export const checkuserToken = () => {
  return async dispatch => {
    getObjByKey('loginResponse').then(res => {
      res
        ? dispatch({
            type: AUTH_STATUS,
            payload: true,
          })
        : dispatch({
            type: AUTH_STATUS,
            payload: false,
          });
    });
  };
};

export const addItem = data => ({
  type: ADD_Item,
  payload: data,
});

export const removeItem = index => ({
  type: Remove_Item,
  payload: index,
});
