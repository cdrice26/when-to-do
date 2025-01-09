// Helper functions to make mutating state easier

/**
 * Adds a new value to state array
 * @param {T[]} state - Reference to state variable
 * @param {(value: T) => void} setter - Reference to state setter
 * @param {T} value - New value you want to add to the state
 */
export const addToState = <T>(
  state: T[],
  setter: (value: T[]) => void,
  value: T
) => {
  setter([...state, value]);
};

/**
 * Removes a value at specified index from state array
 * @param {T[]} state - Reference to state variable
 * @param {(value: T[]) => void} setter - Reference to state setter
 * @param {Number} index - Index of item to remove from state array
 */
export const removeFromState = <T>(
  state: T[],
  setter: (value: T[]) => void,
  index: number
) => {
  setter([...state.filter((_, i) => i !== index)]);
};

/**
 * Updates a specified parameter in an object at a specified index of a state array
 * @param {T[]} state - Reference to state variable
 * @param {(value: T[]) => void} setter - Reference to state setter
 * @param {Number} index - Index of item to edit
 * @param {string} parameter - Key of item to edit in the object
 * @param {U} value - Value to update the parameter to
 */
export const editElementInState = <T, U>(
  state: T[],
  setter: (value: T[]) => void,
  index: number,
  parameter: string,
  value: U
) => {
  setter([
    ...state.slice(0, index),
    {
      ...state[index],
      [parameter]: value
    },
    ...state.slice(index + 1)
  ]);
};
