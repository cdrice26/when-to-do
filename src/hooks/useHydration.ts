import { useEffect, useState } from 'react';

/**
 * Custom hook to determine if the component is hydrated.
 */
const useHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};

export default useHydration;
