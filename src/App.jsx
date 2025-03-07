//Misc
import "./App.css";

//Routes
import NavigationRoutes from "./routes/Routes";

//Dependency
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

//Components
import Loader from "./components/loader/Loader";
import Center from "./components/center/Center";

function App() {
  const { loading } = useContext(AppContext);

  if (loading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  return <NavigationRoutes></NavigationRoutes>;
}

export default App;
