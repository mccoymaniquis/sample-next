// src/Providers/index.tsx
"use client";

import { Provider } from "react-redux";

import { store } from "@/reducers/Store";

type Props = {
  children: React.ReactNode;
};

const Providers: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
