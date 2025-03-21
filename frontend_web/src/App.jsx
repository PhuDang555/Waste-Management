import { CssBaseline, GlobalStyles } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip, BarElement } from "chart.js";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip, BarElement);

function App() {
  const globalStyles = {
    a: {
      color: "unset",
      textDecoration: "none"
    },
    body: {
      padding: 0,
    },
  };

  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
