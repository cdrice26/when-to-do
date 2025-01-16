import { v4 as uuidv4 } from 'uuid';

// UUID Documentation Source: https://www.npmjs.com/package/uuid

/**
 * Generate a random UUID
 * @returns A random UUID string
 */
const randId = () => uuidv4();

export default randId;
