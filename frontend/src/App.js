import { useEffect, useState } from 'react'
import './App.css';
import NavigationBar from './Components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileBar from './Components/ProfileTab';
import ProfileActivity from './Components/ProfileActivity'
// This is where the navigation bar and profile page are being rendered
function App() {
  const [dat, setDat] = useState("")
  useEffect(() => {
    fetch("http://localhost:8081/test")
      .then(res => res.text().then(t => setDat(t)))
  }, [])
  return (
    <div className="Background">
      <NavigationBar/>
      <ProfileBar />
      <ProfileActivity />
      </div>
  );
}

export default App;
