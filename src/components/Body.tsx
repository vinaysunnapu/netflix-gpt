import { createBrowserRouter } from "react-router-dom";
import Browse from "../pages/Browse";
import Player from "../pages/Player";
import Login from "../auth/Login";
import { RouterProvider } from "react-router-dom";


const Body = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/player/:movieId",
      element: <Player />,
    },
  ]);



  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
