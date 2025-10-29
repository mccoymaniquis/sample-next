import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import ChartReducer from "./Charts";
import DemandReducer from "./Demand";
import ModalsReducer from "./Modal";
import ReportReducer from "./Report";
import SupplyReducer from "./Supply";
import UserReducer from "./User";
import WeeklyDeploymentReducer from "./WeeklyDeployment";

const rootReducer = combineReducers({
  modal: ModalsReducer,
  demand: DemandReducer,
  charts: ChartReducer,
  user: UserReducer,
  reports: ReportReducer,
  weeklyDeployment: WeeklyDeploymentReducer,
  supply: SupplyReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [""],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { persistor, store };
