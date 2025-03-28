import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { store, persistor } from "./Redux/Store/Store.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
