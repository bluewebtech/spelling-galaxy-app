import { useMemo } from 'react';
import { usePathname } from 'expo-router';

const usePath = () => {
  const pathname = usePathname();

  const isBasePath = useMemo(() => pathname === '/', []);

  return [{ isBasePath }];
};

export default usePath;
