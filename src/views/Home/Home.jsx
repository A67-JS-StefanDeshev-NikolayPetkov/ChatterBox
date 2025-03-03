//Dependency
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

//Components
import Header from "../../components/header/Header";

//Misc
import "./Home.css";

function Home() {
  const { user } = useContext(AppContext);

  if (!user)
    return (
      <>
        <Header></Header>
        <div className="home-content">
          <p>asdf</p>
        </div>
      </>
    );

  return <p>logged in</p>;
}

export default Home;
