import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./Routing";
import "./styles/global.css";

const App = () => {
    return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default App;
