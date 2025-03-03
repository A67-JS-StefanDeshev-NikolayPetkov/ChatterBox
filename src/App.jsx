//Misc
import "./App.css";

//Routes
import NavigationRoutes from "./routes/Routes";

//Dependency
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

//Components
import Loader from "./components/loader/Loader";

function App() {
  const { loading } = useContext(AppContext);

  if (loading) return <Loader />;

  return <NavigationRoutes></NavigationRoutes>;
}

export default App;
