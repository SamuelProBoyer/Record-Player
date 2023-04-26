import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import Layout from "./Layout/Layout";
import RecordPlayer from "./composante/RecordPlayer";
import Musiques from "./composante/Musiques";
import Login from "./Login";
import AllSongs from "./composante/AllSongs";
import "./App.css";
import { authContext } from "./AuthContext/authContext";
import FileImport from "./composante/FileImport";

function App() {
  const { user } = useContext(authContext);
  
  const routes = user
    ? [
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Navigate to="/recordplayer" replace />,
            },
            {
              path: "/recordplayer",
              element: <RecordPlayer />,
            },
            {
              path: "/musiques",
              element: <Musiques />,
            },
            {
              path: "/allsongs",
              element: <AllSongs />,
            },
            {
              path: "/fileimport",
              element: <FileImport />,
            },
            {
              path: "*",
              element: <Navigate to="/recordplayer" replace />,
            },
          ],
        },
      ]
    : [
        {
          path: "/",
          element: <Login />,
          children: [
            {
              indewx: true,
              element: <Navigate to="/login" replace />,
            },
            {
              path: "login",
              element: <Login />,
            },
          ],
        },
        {
          path: "*",
          element: <Navigate to="/login" replace />,
        },
      ];
  return (
    
      <RouterProvider router={createBrowserRouter(routes)} />

  );
}
export default App;
