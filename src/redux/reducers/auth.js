import {AUTH_STATUS} from '../types';
import {ADD_Item, Remove_Item} from '../types';

export default function (state = false, action) {
  // console.log(action.payload);
  switch (action.type) {
    case AUTH_STATUS:
      return action.payload;
    default:
      return state;
  }
}

export const Auth = (state = [], action) => {
  switch (action.type) {
    case ADD_Item:
      return [...state, action.payload];
    case Remove_Item:
      const deleteArray= state.filter((item,index)=>{
        return (index !== action.payload);
        });
        return deleteArray;
      
    default:
      return state;
  }
};
