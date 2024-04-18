import { CircularProgress } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactsPage from "./pages/contacts/Contacts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ContactsPage />,
  },
]);

function App() {
  return (
    <RouterProvider fallbackElement={<CircularProgress />} router={router} />
  );
}

export default App;
