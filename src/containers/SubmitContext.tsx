import React, { createContext } from "react";

type SubmitContextType = {
  registerSubmit: (fn: () => void) => void;
  triggerSubmit: () => void;
};
// eslint-disable-next-line react-refresh/only-export-components
export const SubmitContext = createContext<SubmitContextType | undefined>(undefined);

// useSubmit has been moved to a separate file in the hooks folder.

export function SubmitProvider({ children }: { children: React.ReactNode }) {
  const submitRef = React.useRef<() => void>(() => {});

  const registerSubmit = React.useCallback((fn: () => void) => {
    submitRef.current = fn;
  }, []);

  const triggerSubmit = React.useCallback(() => {
    submitRef.current?.();
  }, []);

  const contextValue = React.useMemo(() => ({ registerSubmit, triggerSubmit }), [registerSubmit, triggerSubmit]);

  return (
    <SubmitContext value={contextValue}>
      {children}
    </SubmitContext>
  );
};
