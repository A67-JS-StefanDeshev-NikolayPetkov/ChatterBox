import "./About.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";

function About() {
  const navigate = useNavigate();

  return (
    <>
    <Header></Header>
    <div className="about-container">
      <h1>About ChatterBox</h1>
      <p>
        ChatterBox is a modern chat application designed to help you stay
        connected with friends, family, and teams. Whether you're chatting one-on-one
        or collaborating in groups, ChatterBox provides a seamless and intuitive
        experience.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Real-time messaging with friends and teams</li>
        <li>Create and manage teams for group collaboration</li>
        <li>Customizable user profiles</li>
      </ul>
      <h2>Our Mission</h2>
      <p>
        Our mission is to provide a simple, reliable, and enjoyable chat
        experience for everyone. Whether you're catching up with friends or
        working on a project, ChatterBox is here to make communication easy.
      </p>
    </div>
    </>
  );
}

export default About;