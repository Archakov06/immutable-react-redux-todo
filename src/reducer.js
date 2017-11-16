import { List, Map, fromJS } from 'immutable';

const initialState = List([]);

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return state.push(
        Map({
          id: state.isEmpty() ? 0 : fromJS(state.get(-1)).get('id') + 1,
          text: action.payload,
          completed: false,
        }),
      );
      break;
    case 'COMPLETE_ITEM':
      return state.map(
        o =>
          o.get('id') === action.payload
            ? o.update('completed', completed => !completed)
            : o,
      );
      break;
    case 'REMOVE_ITEM':
      return state.filter(o => o.get('id') !== action.payload);
      break;
    default:
      return state;
  }
};
