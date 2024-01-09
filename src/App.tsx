import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import BoardList from "./components/board/list";
import BoardDetail from "./components/board/detail";
import BoardForm from "./components/board/form";
import styled from "styled-components";


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
    },
    {
      path:'/posts/write',
      element: <BoardForm />
    },
    {
      path:'/posts/:id/edit',
      element: <BoardForm />
    },
  ])

  return (
    <Container>
      <RouterProvider router={routes}/>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`

export default App;
