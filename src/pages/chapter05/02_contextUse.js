import React, {createContext, useContext, useRef, useMemo} from 'react';
import { useSubscription } from 'use-subscription';

const ThemeContext = createContext('light');

const Component = () => {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>
}

export const ComponentContextUse = () => {
  return (
    <>
      <h3>컨텍스트 사용이 필요한 시점</h3>
      <br /><br /><div>===== 테마를 createContext 기본값을 넣어 생성 </div>
      <br /> Provider의 value값을 따르며, 가장 가까운 값을 적용함
      <Component />
      <ThemeContext.Provider value="dark">
        <Component />
      </ThemeContext.Provider>
      <ThemeContext.Provider value="red">
        <ThemeContext.Provider value="blue">
          <Component />
        </ThemeContext.Provider>
      </ThemeContext.Provider>
    </>
  )
}