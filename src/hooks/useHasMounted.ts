// hooks/useHasMounted.ts
import { useEffect, useState } from "react";

export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setHasMounted(true);
  }, []);

  return hasMounted;
}
