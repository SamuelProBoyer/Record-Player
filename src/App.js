import {RouterProvider, createBrowserRouter, Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {doc, getDocs, onSnapchot} from 'firebase/firestore';
import {db} from './config/firebase';
import Layout from './Layout/Layout';
import RecordPlayer from './composante/RecordPlayer';
import './App.css';

function App() {
  const routes = [
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
        }
      ]
    }
  ]
  return (
    <RouterProvider router={createBrowserRouter(routes)} />
  );
}
export default App;
