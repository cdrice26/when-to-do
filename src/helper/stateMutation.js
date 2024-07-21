// Helper functions to make mutating state easier

/**
 * Adds a new value to state array
 * @param {*} state - Reference to state variable
 * @param {Function} setter - Reference to state setter
 * @param {*} value - New value you want to add to the state
 */
export const addToState = (state, setter, value) => {
  setter([...state, value]);
};

/**
 * Removes a value at specified index from state array
 * @param {*} state - Reference to state variable
 * @param {Function} setter - Reference to state setter
 * @param {Number} index - Index of item to remove from state array
 */
export const removeFromState = (state, setter, index) => {
  setter([...state.filter((_, i) => i !== index)]);
};

/**
 * Updates a specified parameter in an object at a specified index of a state array
 * @param {*} state - Reference to state variable
 * @param {Function} setter - Reference to state setter
 * @param {Number} index - Index of item to edit
 * @param {*} parameter - Key of item to edit in the object
 * @param {*} value - Value to update the parameter to
 */
export const editElementInState = (state, setter, index, parameter, value) => {
  setter([
    ...state.slice(0, index),
    {
      ...state[index],
      [parameter]: value
    },
    ...state.slice(index + 1)
  ]);
};
