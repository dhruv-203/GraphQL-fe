import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import AddTodo from "./pages/AddTodo.tsx";
import Home from "./pages/Home.tsx";
import UpdateTodo from "./pages/UpdateTodo.tsx";
const client = new ApolloClient({
  uri: "http://192.168.29.66:8080/graphql",
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/addTodo",
        element: <AddTodo />,
      },
      {
        path: "/updateTodo/:id",
        element: <UpdateTodo />,
      },
    ],
  },
]);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </StrictMode>
  );
} else {
  throw new Error("Root element not found");
}
