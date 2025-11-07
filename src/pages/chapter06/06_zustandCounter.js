import { useStore } from './06_zustandStore';

export function Counter() {
  const count = useStore(state => state.counter.value);
  const { increment, decrement } = useStore(state => state.counterActions);
  return (<div>
    <button onClick={increment}>Increment</button>
    <span>{count}</span>
    <button onClick={decrement}>Decrement</button>
  </div>);
}