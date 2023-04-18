import {RouterProvider, createBrowserRouter, Navigate} from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {doc, getDocs, onSnapchot} from 'firebase/firestore';
import {db} from './config/firebase';
import Layout from './Layout/Layout';
import RecordPlayer from './composante/RecordPlayer';
import Musiques from './composante/Musiques';
import Playlists from './composante/Playlists';
import Login from './Login';
import './App.css';
import { authContext } from './AuthContext/authContext';

function App() {
  const {user} = useContext(authContext);


  const routes = user ? [
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          index:true,
          element: <Navigate to='/recordplayer' replace/>
        }, {
          path: '/recordplayer',
          element: <RecordPlayer />
        },
        {
          path: '/musiques',
          element: <Musiques />
        }
        ,
        {
          path: '/playlists',
          element: <Playlists />
        }
        ,
        {
          path: '*',
          element: <Navigate to="/recordplayer" replace />
        }
      ]
    }
  ] : [
    {
      path: "/",
      element: <Login />,
      children: [{
        indewx:true,
        element: <Navigate to="/login" replace/>
      }, {
        path: "login",
        element: <Login />
      }]
    } , {
      path: "*",
      element: <Navigate to="/login" replace/>
    }
  ]
  return (
    <RouterProvider router={createBrowserRouter(routes)} />
  );
}
export default App;
