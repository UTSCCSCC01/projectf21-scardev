import { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [dat, setDat] = useState("")
  useEffect(() => {
    fetch("http://localhost:8081/test")
      .then(res => res.text().then(t => setDat(t)))
  }, [])
  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {dat === "" ? "requesting data" : dat}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
