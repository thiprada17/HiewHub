
import '../App.css'
import gif from '../assets/decor-gif.gif' 
import Navbars from '../components/Navbars.jsx';
import Topics from '../components/Topics.jsx';
import Buttons from '../components/Buttons.jsx';
import ContainersFind from '../components/ContainersFind.jsx';

export default function MainFind() {
  return (
    <>
      <Navbars />
      <Topics />
      <Buttons />
      <ContainersFind />
    </>
  );
}