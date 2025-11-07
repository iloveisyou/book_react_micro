import { atom, useAtom } from 'jotai';

const textAtom = atom(''); // key 값 없앰

const TextInput = () => {
  const [text, setText] = useAtom(textAtom); // useRecoilState 대신 useAtom
  return (<div>
    <input type="text" value={text} onChange={event=>setText(event.target.value)} />
    <br /> Echo: {text}
  </div>)
};

const charCountAtom = atom(get => get(textAtom).length); // selector 대신 atom




const CharacterCount = () => {
  const [count] = useAtom(charCountAtom); // useRecoilValue 대신 useAtom
  return <>Character Count: {count}</>
};

const CharacterCounter = () => (<div> <TextInput /> <CharacterCount /> </div>)

// RecoilRoot컴포넌트 필요없음, Jotai에서는 Provider컴포넌트 필요없음
export const App4 = () => (
  <><CharacterCounter /></>
)