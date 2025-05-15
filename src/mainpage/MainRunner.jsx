import '../App.css'
import Navbars from '../components/Navbars.jsx';
import Topics from '../components/Topics.jsx';
import Buttons from '../components/Buttons.jsx';
import Containers from '../components/Containers.jsx';

export default function MainRunner() {
  return (
    <>
      <Navbars />
      <Topics />
      <Buttons />
      <Containers />
    </>
  );
}