export const UPDATE_FORM = 'UPDATE_FORM';
export const RESET_FORM = 'RESET_FORM';
export const UPDATE_PERSON_FORM = 'UPDATE_PERSON_FORM';
export const RESET_PERSON_FORM = 'RESET_PERSON_FORM';

export const updateMovieForm = (name, value) => ({
  type: UPDATE_FORM,
  payload: { name, value }
});

export const resetMovieForm = () => ({
  type: RESET_FORM
});

export const updatePersonForm = (name, value) => ({
  type: UPDATE_PERSON_FORM,
  payload: { name, value }
});

export const resetPersonForm = () => ({
  type: RESET_PERSON_FORM
});
