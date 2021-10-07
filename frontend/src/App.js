import { useEffect, useState } from 'react'
import './App.css';
import NavigationBar from './Components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [dat, setDat] = useState("")
  useEffect(() => {
    fetch("http://localhost:8081/test")
      .then(res => res.text().then(t => setDat(t)))
  }, [])
  return (
    <div><NavigationBar /></div>
  );
}

export default App;
