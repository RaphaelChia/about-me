import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useLastPathname = () => {
  const pn = usePathname();
  const [lastPathname, setLastPathname] = useState('');
  useEffect(() => {
    setLastPathname(pn.split('/').pop() ?? '');
  }, [pn]);
  return lastPathname;
};

export default useLastPathname;
