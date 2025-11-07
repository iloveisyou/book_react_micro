import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';

class Timer { // 비지니스 로직 정의, 클래시 생성 인스턴스를 만듬
  secondsPassed = 0;
  constructor() { makeAutoObservable(this); } // myTimer 인스턴스를 관찰 가능한 객체로 만드는데 사용
  increase() { this.secondsPassed += 1; }
  reset() { this.secondsPassed = 0; }
}

const myTimer = new Timer();

setInterval(()=>{
  myTimer.increase();
},1000);

const TimerView = observer(({timer})=> ( // observer함수는 고차컴포넌트, timer.secondsPassed가 변경될때마다 리렌더링
  <button onClick={()=>timer.reset()}>Seconds passed: {timer.secondsPassed}</button>
));


export const App5 = () => (<div><TimerView timer={myTimer} /></div>)