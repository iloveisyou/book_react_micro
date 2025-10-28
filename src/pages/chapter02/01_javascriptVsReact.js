import React, {useState} from 'react';

export const JavascriptVsReact = () => {

  // 함수와 인수
  const addOne = (n) => n + 1;
  console.log('addOne(1) ->', addOne(1));

  // 싱글턴 - 함수는 전역변수에 의존, 트레이드 오프, 외부에서 함수작동방식 변경(강력한 기능), 의존한다는 걸 모르고 다른곳에서 변경할때
  let base = 1;
  const addBases = (n) => n + base;
  console.log('addBase(2) ->', addBases(2));

  // 싱글턴형식의 모듈화
  const createContainer = () => {
    let base = 1;
    const addBase = (n) => n + base;
    const changeBase = (b) => { base = b;}
    return { addBase, changeBase }
  }
  const { addBase, changeBase } = createContainer();
  console.log('addBas(5) ->', addBase(5));
  changeBase(3);
  console.log('addBas(7) ->', addBase(7));
  console.log('addBas(3) ->', addBase(3));

  return (
    <>
      <div>test</div>
      <Component number={1} />
      <AddOne number={1} />
      <AddBase number={1} />
    </>
  )
}

// 리액트 컴포넌트와 props
// jsx (Javascript syntax extension) : <> 가 폼함되어 있는 구문, react 사용
const Component = ({number}) => {
  return <div>{number}</div>;
}
const AddOne = ({number}) => {
  return <div>{number + 1}</div>;
}

// 지역 상태에 대한 useState 이해하기
const AddBase = ({number}) => {
  const [base, changeBase] = useState(2);
  return <div>{number + base}</div>;
}
