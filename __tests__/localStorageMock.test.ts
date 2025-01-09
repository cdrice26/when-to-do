test('localStorage mock functionality', () => {
  const key = 'testKey';
  const value = 'testValue';

  // Set an item in localStorage
  localStorage.setItem(key, value);

  // Retrieve the item from localStorage
  const storedValue = localStorage.getItem(key);
  expect(storedValue).toBe(value);

  // Remove the item
  localStorage.removeItem(key);
  const removedValue = localStorage.getItem(key);
  expect(removedValue).toBe(null);

  // Clear all items
  localStorage.setItem('anotherKey', 'anotherValue');
  localStorage.clear();
  const clearedValue = localStorage.getItem('anotherKey');
  expect(clearedValue).toBe(null);
});
