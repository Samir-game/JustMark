
import Login from "./components/Login.jsx"
import MapPage from "./components/MapPage.jsx"
import SignUp from "./components/SignUp.jsx"
import {createBrowserRouter, RouterProvider} from "react-router-dom"

const router= createBrowserRouter([
  {path: "/signup", element: <SignUp/>},
  {path: "/login", element: <Login/>},
  {path: "/pin", element: <MapPage/>},

])

function App() {
 return (
  <div> 
    <RouterProvider router={router}/>
  </div>
 )
  
}

export default App
