import React, { useReducer } from 'react';
import styled from './style.module.scss';
// 기본사용법 연습하기2
const init = { name: '', address: '', ea: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'NAME': return { ...state, name: action.name };
    case 'ADDRESS': return { ...state, address: action.address };
    case 'EA_PLUS': return { ...state, ea: state.ea + 1 };
    case 'EA_MINU': return { ...state, ea: state.ea - 1 };
    case 'RESET' : return init
    default: throw new Error('reducer error');
  }
}

export const ComponentUsereducerEx2 = () => {
  // const [state, dispatch] = useReducer(reducer, { name: '', address: '', ea: 0 });
  const [state, dispatch] = useReducer(reducer, init);

  const onsubmit = () => alert(`${state.name} 고객님의 \n주소지인  ${state.address} 에  \n수박 ${state.ea} 통이 배송 예정입니다.`);
  // const onreset = () => 
  return (
    <div className={styled.wrap}>
        <h3>2025 여름 수박 사기 :: 배송 정보 입력</h3>
        <dl className={styled.wrap}>
          <dt>이름</dt><dd><input type="text" value={state.name} onChange={(e)=>dispatch({ type: 'NAME', name: e.target.value })} /></dd>
          <dt>주소</dt><dd><input type="text" value={state.address} onChange={(e)=>dispatch({ type: 'ADDRESS', address: e.target.value})} /></dd>
          <dt>수박갯수</dt><dd>{state.ea}
            <button type="button" onClick={()=>dispatch({type: 'EA_MINU'})}>갯수빼기</button>
            <button type="button" onClick={()=>dispatch({type: 'EA_PLUS'})}>갯수추가</button>
          </dd>
        </dl>
        <button type="button" onClick={()=>dispatch({type: 'RESET'})}>초기화</button>
        <button type="button" onClick={onsubmit}>배송신청 신청완료</button>
    </div>
  )
}