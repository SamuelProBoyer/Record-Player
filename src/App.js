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
import { authContext } from "./Providers/authContext";
import FileImport from "./composante/FileImport";
import { songsContext } from "./Providers/SongProvider";

function App() {
  const { user } = useContext(authContext);
  const {songs} = useContext(songsContext);
  console.log(songs);

  const routes = user
    ? [
        {
          path: "/",
          element: <Layout songs={songs}/>,
          children: [
            {
              index: true,
              element: <Navigate to="/recordplayer" replace />,
            },
            {
              path: "/recordplayer",
              element: <RecordPlayer songs={songs}/>,
            },
            {
              path: "/musiques",
              element: <Musiques  songs={songs}/>,
            },
            {
              path: "/allsongs",
              element: <AllSongs songs={songs}/>,
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
