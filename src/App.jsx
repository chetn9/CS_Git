import BirthdayPage from './BirthdayPage'
import SpiralPhotoGallery from './components/SpiralPhotoGallery'
import BirthDay3D from './components/Birthday3DGallery'
import EnvelopeCard from './components/EnvelopeCard'
import { useEffect } from 'react';

function App() {
   
  useEffect(() => {
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };
  
  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };
  
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      return false;
    }
  };
  
  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('dragstart', handleDragStart);
  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.removeEventListener('contextmenu', handleContextMenu);
    document.removeEventListener('dragstart', handleDragStart);
    document.removeEventListener('keydown', handleKeyDown);
  };
}, []);

  return (

    <>
      <BirthdayPage/>
    </>
  )
}

export default App