import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import UserContextProvider from "./components/UserContextProvider";
import RequireAuth from "./components/RequireAuth";
import SignUp from "./routes/SignUp";
import Notes from "./routes/Notes";
import CreateNote from "./routes/CreateNote";
import ViewNote from "./routes/ViewNote";
import EditNote from "./routes/EditNote";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/createnote",
        element: <CreateNote />,
      },
      {
        path: "/viewnote",
        element: <ViewNote />,
      },
      {
        path: "/editnote",
        element: <EditNote />,
      },
    ],
  },
]);

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router}>
        <Navigate to="/signup" />
      </RouterProvider>
    </UserContextProvider>
  );
}
