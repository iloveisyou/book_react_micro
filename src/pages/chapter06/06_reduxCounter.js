import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './06_reduxCounterSlice';

export function Counter () {
  const count = useSelector( state  => state.counter.value );
  const dispatch = useDispatch();
  return (<div>
    <button onClick={()=>dispatch(increment())}>Increament</button>
    <span>{count}</span>
    <button onClick={()=>dispatch(decrement())}>Decrement</button>
  </div>);
}