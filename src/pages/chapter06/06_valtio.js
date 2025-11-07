import { proxy, useSnapshot } from 'valtio';

const myTimer = proxy({
  secondsPassed: 0,
  increase: () => { myTimer.secondsPassed += 1; },
  reset: () => { myTimer.secondsPassed = 0; },
});

setInterval(()=>{
  myTimer.increase();
}, 1000);

const TimerView = ({timer}) => {
  const snap = useSnapshot(timer);
  return (<button onClick={()=>timer.reset()}>Seconds passed: {snap.secondsPassed} </button>)
};


// Valtio 예제 - Valtio가 허용하는 방식중에 다른형태로 코딩
const timer2 = proxy({secondsPassed: 0});
export const increase = () => { timer2.secondsPassed += 1; }
export const reset = () => { timer2.secondsPassed = 0; }
export const useSecondsPasses = () => useSnapshot(timer2).secondsPassed;
export const App6 = () => (<div><TimerView timer={myTimer} /></div>);