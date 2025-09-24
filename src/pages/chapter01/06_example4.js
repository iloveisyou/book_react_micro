import React, {useReducer} from 'react';

// 인라인 리듀서 사용하기
const useScore = (bonus) =>
  useReducer((prev, delta) => prev + delta + bonus, 0);

//// 복습 연습하기
const useScore2 = (bonus) => useReducer((prev, delta) => prev + delta + bonus, 5);
const useScore3 = (saram) => useReducer((prev, don) => prev + don / saram, 0)

export const Component1Example4 = () => {
  const [num, dispatch] = useScore(5);
  const [num2, dispatch2] = useScore2(10);
  const [num3, dispatch3] = useScore3(4);

  return (
    <div>
      {num} /  {num2}
      <br />
      <button type="button" onClick={()=>dispatch(11)}>action</button>
      <button type="button" onClick={()=>dispatch2(5)}>action2</button>
      <br /><br /><br /><br /> 장당 1000원 하는 티켓을 팔아서 4명 동업자 중 1인이 가지는 금액 {num3} 원
      <br /><button type="button" onClick={()=>dispatch3(1000)}>팔릴때마다 클릭</button>
    </div>
  )
}