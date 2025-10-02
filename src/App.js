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
            <strong>1부 리액트 훅과 마이크로 상태 관리</strong>
            <p>01. 리액트 훅을 이용한 마이크로 상태 관리</p>
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
            <strong>2부 전역 상태에 대한 기초적인 접근법</strong>
            <p>02. 지역 상태와 전역 상태 사용하기</p>
            <Link to="/chapter02/01_javascriptVsReact">01_javascriptVsReact</Link>
            <Link to="/chapter02/02_stateRegion">02_stateRegion</Link>
            <Link to="/chapter02/03_stateGlobal">03_stateGlobal</Link>
            <p>03. 리액트 컨텍스트를 이용한 컴포넌트 상태 공유</p>
            <Link to="/chapter03/01_usecontext">01_usecontext</Link>
            <Link to="/chapter03/02_usecontext2">02_usecontext2</Link>
            <Link to="/chapter03/03_usecontext3">03_usecontext3</Link>
            <Link to="/chapter03/04_usecontext4">04_usecontext4</Link>
            <Link to="/chapter03/05_usecontext5">05_usecontext5</Link>
            <Link to="/chapter03/06_usecontext6">06_usecontext6</Link>
            <p>04. 구독을 이용한 모듈 상탵 공유</p>
            <Link to="/chapter04/01_module">01_module</Link>
            <Link to="/chapter04/02_module2">02_module2</Link>
            <Link to="/chapter04/03_subscribe">03_subscribe</Link>
            <Link to="/chapter04/04_usesubscription">04_usesubscription</Link>
            <Link to="/chapter04/05_usesubscriptionEx">05_usesubscriptionEx</Link>
            <p>05. 리액트 컨텍스트와 구독을 이용한 컴포넌트 상태 공유</p>
            <Link to="/chapter05/01_moduleState">01_moduleState</Link>
            <Link to="/chapter05/02_contextUse">02_contextUse</Link>
            <Link to="/chapter05/03_contextPattern">03_contextPattern</Link>
          </div>
          <div className="step">
            <strong>3부 라이브러리 구현 및 용도</strong>
            <p>06. 전역 상태 관리 라이브러리 소개</p>
            <Link to="/chapter06/01_globalVariable">01_globalVariable</Link>
            <Link to="/chapter06/02_zustand">02_zustand</Link>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default App;
