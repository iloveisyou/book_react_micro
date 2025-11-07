import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const textState = atom({ key: 'textState', default: '', });

const TextInput = () => {
  const [text, setText] = useRecoilState(textState); // useRecoilState, 정의한 상태사용
  return (<div>
    <input type="text" value={text} onChange={(event)=>{setText(event.target.value)}} />
    <br /> Echo: {text}
  </div>);
};

const charCountState = selector({ // get속성은 파생 값을 반환, selector 함수에 의해 값(atom, selector) 반환
  key: 'charCountState',
  get: ({get}) => get(textState).length,
});

const CharacterCount = () => {
  const count = useRecoilValue(charCountState); // useRecoilValue, 상태의 값부분만 반환, 훅
  return <>Character Count: {count}</>
}

const CharacterCounter = () => (<div> <TextInput /> <CharacterCount /> </div>)

// RecoilRoot, 상태값을 저장하는 컴포넌트
export const App3 = () => (<RecoilRoot> 
  <CharacterCounter />
</RecoilRoot>)