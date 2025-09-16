import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Link to="01_usecount">01_usecount</Link>
        <Link to="02_child">02_child</Link>
        <Link to="03_global">03_global</Link>
        <Link to="04_usestate">04_usestate</Link>
        <Link to="04_usestate2">04_usestate2</Link>
        <Link to="04_usestate3">04_usestate3</Link>
        <Link to="04_usestate4">04_usestate4</Link>
        <Link to="04_usestate5">04_usestate5</Link>
      </header>
    </div>
  );
}

export default App;
