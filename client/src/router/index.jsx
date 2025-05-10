import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AuthProvider from "../context/AuthProvider";
import ProtectedRouter from "./ProtectedRouter";
import ErrorPage from "../pages/ErrorPage";
import NoteList from "../components/NoteList";
import Note from "../components/Note";
import AuthLayout from "./AuthLayout";
import { foldersLoader } from "../utils/FoldersUtils";
import { addNewNote, noteloader, notesloader, updateNote } from "../utils/NoteUtils";


export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <ProtectedRouter />,
        children: [
          {
            path: "/",
            element: <Home />,
            loader: foldersLoader,
            children: [
              {
                path: "folder/:folderId", // Định nghĩa folderId
                element: <NoteList />, // Render NoteList khi truy cập /folder/:folderId
                action: addNewNote,
                loader: notesloader,
                children: [
                  {
                    path: "note/:noteId", // Định nghĩa noteId, nhưng không bắt đầu bằng "/"
                    element: <Note />, // Render Note khi truy cập /folder/:folderId/note/:noteId
                    action: updateNote,
                    loader: noteloader,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
