import uuid from 'uuid-js';

// UUID Documentation Source: https://www.npmjs.com/package/uuid-js

/**
 * Generate a random id
 * @returns A random id
 */
const randId = () => uuid.create().toString();

export default randId;
