import { UPDATE_PERSON_FORM, RESET_PERSON_FORM } from '../actions';

const initialState = {
  name: '',
  dob: '',
  gender: '',
  bio: '',
  photo: null
};

const personFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PERSON_FORM:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case RESET_PERSON_FORM:
      return initialState;
    default:
      return state;
  }
};

export default personFormReducer;
