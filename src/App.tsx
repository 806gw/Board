import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import BoardList from "./components/board/list";
import BoardDetail from "./components/board/detail";


function App() {
  const routes = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path:'/register',
      element: <Register />
    },
    {
      path: '/',
      element: <BoardList />
    },
    {
      path: '/posts/:id',
      element: <BoardDetail />
    }
  ])

  return (
    <div>
      <RouterProvider router={routes}/>
    </div>
  );
}

export default App;
