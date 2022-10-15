import React, { useMemo, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routers } from "./config/router";

import Header from "./components/ui/Header";
import AlertModal from "./components/Modals/AlertModal";

type Alert = {
  show: boolean;
  text: React.ReactNode;
};
export const AlertContext = React.createContext<{
  alert: Alert;
  setAlert: React.Dispatch<
    React.SetStateAction<{ show: boolean; text: React.ReactNode }>
  >;
}>({
  alert: {
    show: false,
    text: null,
  },
  setAlert: () => {},
});

function App() {
  const [alert, setAlert] = useState<Alert>({
    show: false,
    text: null,
  });
  const value = useMemo(() => ({ alert, setAlert }), [alert]);

  const router = createBrowserRouter(routers);

  return (
    <div className="App">
      <AlertContext.Provider value={value}>
        <AlertModal />
        <Header />

        <div className="container px-6 mx-auto">
          <RouterProvider router={router} />
        </div>
      </AlertContext.Provider>
    </div>
  );
}

export default App;
