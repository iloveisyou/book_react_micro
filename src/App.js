import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <nav className="nav_list">
          <div className="step">
            <Link to="/chapter01/01_usecount">01_usecount</Link>
            <Link to="/chapter01/02_child">02_child</Link>
            <Link to="/chapter01/03_global">03_global</Link>
            <Link to="/chapter01/04_usestate">04_usestate</Link>
            <Link to="/chapter01/04_usestate2">04_usestate2</Link>
            <Link to="/chapter01/04_usestate3">04_usestate3</Link>
            <Link to="/chapter01/04_usestate4">04_usestate4</Link>
            <Link to="/chapter01/04_usestate5">04_usestate5</Link>
            <Link to="/chapter01/04_usestate6">04_usestate6</Link>
            <Link to="/chapter01/04_usestate6">04_usestate7</Link>
            <Link to="/chapter01/05_usereducer">05_usereducer</Link>
            <Link to="/chapter01/05_usereducer_ex1">05_usereducer_ex1</Link>
            <Link to="/chapter01/05_usereducer_ex2">05_usereducer_ex2</Link>
            <Link to="/chapter01/05_usereducer2">05_usereducer2</Link>
            <Link to="/chapter01/05_usereducer3">05_usereducer3</Link>
            <Link to="/chapter01/05_usereducer4">05_usereducer4</Link>
            <Link to="/chapter01/06_example">06_example</Link>
            <Link to="/chapter01/06_example2">06_example2</Link>
            <Link to="/chapter01/06_example3">06_example3</Link>
            <Link to="/chapter01/06_example4">06_example4</Link>
          </div>
          <div className="step">
            <Link to="/chapter02/01_javascriptVsReact">01_javascriptVsReact</Link>
            <Link to="/chapter02/02_stateRegion">02_stateRegion</Link>
            <Link to="/chapter02/03_stateGlobal">03_stateGlobal</Link>
          </div>
          <div className="step">
            <Link to="/chapter03/01_usecontext">01_usecontext</Link>
            <Link to="/chapter03/02_usecontext2">02_usecontext2</Link>
            <Link to="/chapter03/03_usecontext3">03_usecontext3</Link>
            <Link to="/chapter03/04_usecontext4">04_usecontext4</Link>
            <Link to="/chapter03/05_usecontext5">05_usecontext5</Link>
            <Link to="/chapter03/06_usecontext6">06_usecontext6</Link>
          </div>
          <div className="step">
            <Link to="/chapter04/01_module">01_module</Link>
            <Link to="/chapter04/02_module2">02_module2</Link>
            <Link to="/chapter04/03_subscribe">03_subscribe</Link>
            <Link to="/chapter04/04_usesubscription">04_usesubscription</Link>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default App;
