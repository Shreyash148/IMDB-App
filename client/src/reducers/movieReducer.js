import { UPDATE_FORM, RESET_FORM } from '../actions';

const initialState = {
  movieName: '',
  yearOfRelease: '',
  plot: '',
  poster: null,
  actors: [],
  producers: ''
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};


