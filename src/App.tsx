import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import WorkPage from "./pages/WorkPage";
import PhotographyPage from "./pages/PhotographyPage";
import NotFound from "./pages/NotFound";
import RouteError from "./pages/RouteError";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteError />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          { index: true, element: <Home /> },
          { path: "about", element: <AboutPage /> },
          { path: "work", element: <WorkPage /> },
          { path: "photography", element: <PhotographyPage /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
