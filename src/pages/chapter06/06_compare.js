
import { App } from './06_reduxApp';
import { App2 } from './06_zustandApp';
import { App3 } from './06_recoil';
import { App4 } from './06_jotai';
import { App5 } from './06_mobx';
import { App6, App7 } from './06_valtio';

export const ComponentCompare = () => {
  return (
  <div>
    <h3>11 세 가지 전역 상태 라이브러리의 유사점과 차이점</h3>
    <br /> Zustand, Jotai, Valtio 전역상태 라이브러리의 유사점, 차이점
    <br /> - Zustand: 사용법과 스토어 모델 측면에서 Redux(React Redux) 와 유사하지만, Redux와 달리 리듀서 기반 아님
    <br /> - Jotai: API 측면에서 Recoil과 유사하지만 선택자 기반이 아니고 렌더링 최적화를 위한 최소한의 API 제공 목표
    <br /> - Valtio: 변경 가능한 갱신 모델 측면에서 MobX와 조금 유사하지만 렌더링 최적화 구현 방식 매우 다름
    <br />세 라이브러리 모두 마이크로 상태관리에  적합, 코딩스타일과 렌더링 최적화 접근방식 다름
    
    <br /><br /><div>&diams; <strong>Zustand와 Redux의 차이점</strong></div>
    <br /> <b>&sect;</b> 유사점
    <br /> 단방향 데이터 흐름을 기반 -> 상태를 갱신하라는 Action을 실행, 통해서 상태갱신 후 새로운 상태 전파
    <br /> dispatch와 전파를 분리하는 것은 데이터 흐름을 단순화, 전체시스템을 예측에 용이
    <br /> <b>&sect;</b> 차이점
    <br /> 상태를 갱신하는방법 Redux는 리듀서 기반 - 이전상태와 action 객체를 받아 새로운 상태를 반환하는 순수함수
    <br /> 상태를 갱신하는방법 Zustand는 반드시 리듀서를 사용해 상태갱신할 필요 없음
    <br /> 공식 Redux 튜도리얼 중 하나 - Redux Toolkit을 이용한 최신 리덕스 사용법
    <br /> ㄴ Redux 스토어를 생성하라면 Redux Toolkit 라이브러리의 configureStore를 사용
    <br /> <b>&sect;</b> redux
    <App />
    <br /> <b>&sect;</b> zustand
    <App2 />
    <br /> <b>&sect;</b> Redux, Zustand 공통적인 개념은 공유하지만 차이는 있음
    <br /> 1. 큰차이점은 디렉터리 구조, 
    <br /> Redux: features디렉터리구조 제안, createSlice함수 기능디렉터리패턴 -> 대규모 애플리케이션에 유용한 패턴
    <br /> Zustand: 파일,디렉터리구조 개발자의몫, counterActions사용패턴도 사용가능한 하나의 패턴
    <br /> 2. immer 사용여부 (state.value += 1;) 
    <br /> Redux: 기존적으로 Immer 사용
    <br /> Zustand: Immer 사용안함, 선택사항
    <br /> 3. 컨텍스트 사용 vs 모듈 임포트 사용
    <br /> Redux: 컨텍스트는 런타임에 스토어를 주입할수 있기 때문에 일부 사용사례에서 효과적 = 복잡
    <br /> Zustand: 선택 지원 = 간단
    <br /> 4. Redux Toolkit는 Redux기반 (단반향 데이터흐름 기반)
    <br /> Redux: 상태갱신시 액션을 디스패치, 이제한은 때때로 유지보수성과 확장성에 도움되기도 함
    <br /> Zustand: 데이터흐름 측면에 의견제시 안함, 단방향 데이터 흐름에 사용할수 있지만 라이브러리 지원없어서 개발자가 모든것 처리하기
    <br /> => Redux는 상태를 어떻게 관리할지에 대해 더많은 의견 제시, Zustand는 적극적인 의견제시하지 않음
    <br /> => Redux는 모든기능을 갖춘 라이브러리 제품군, Zustand는 최소한의 라이브러리

    <br /><br /><div>&diams; <strong>Jotai와 Recoil을 사용하는 시점</strong></div>
    <br /> Jotai의 API는 Recoil에서 많은 영감 받음, 처음에 의도적으로 Recoil -> Jotai로 마이그레이션 하도록 설계
    <br /> Recoil 예제가 어떻게 Jotai로 변환되는지 
    <br /> <b>&sect;</b> RecoiDKS
    <App3 />
    <br /> <b>&sect;</b> Jotai
    <App4 />
    <br /> <b>&sect;</b> Recoil과 Jotai 예제 비교 (차이점)
    <br /> 1. 가장 큰차이점은 key문자열 존재, Jotai개발동기중 하나는 key문자열 생략, 기술적으로 간단해보이지만 개발자 경험 큰차이(고유한 key 네이밍)
    <br /> 구현측면에서 Jotai는 WeakMap을 활용, 아톰객체 참조에 의존 != 반면 Recoil은 객체참조에 의존하지 않고 key문자열 기반, 직렬화 가능, 지속성을 쉽게 구현, 조타이도 가능하긴함
    <br /> 2. atom함수, Jotai의 atom함수는 Recoil의 atom, selector을 대체 (단점은 한계가 존재해 다른함수가 필요로함)
    <br /> 3. Jotai의 공급자 제거모드(provider-less mode)는 Provider컴포넌트를 생략할 수 있게 해줌, 기술적으론 간단해보여도 개발자에게 친화적임
    <br /> => Recoil = Jotai 기능면에선 모두 동일, Jotai는 Zustand와 마찬가지로 최소한의 기능만 제공

    <br /><br /><div>&diams; <strong>Valtio와 Mobx 사용하기</strong></div>
    <br /> 철한은 다르지만 자주비교됨, 사용법 측면에서 리액트에 통합하는 것과 관련해서 유사점이 있긴함.
    <br /> 둘다 변경 가능한 상태를 기반으로 하여, 개발자가 직접 상태를 변경할 수 있음, 자바스크립트는 변경 가능한 객체를 기반으로 하므로 객체를 변경하는 문법은 매우 자연스럽고 간결함
    <br /> 불변상태와 비교했을 때 변경 가능한 상태에 대해서는 커다란 이점
    <br /> 개념적으로 Valtio는ㄴ Immer와 비슷함, 둘다 불변상태와 변경가능한 상태를 연결하려함,
    <br /> Valtio - 변경 가능한 상태를 기반으로하고 상태를 불변한 상태로 변환
    <br /> Immer  - 불변 상태를 기반으로하며 변경가능한 상태를 일시적으로 사용
    <br /> <b>&sect;</b> Mobx
    <App5 />
    <br /> <b>&sect;</b> Valtio 
    <App6 />
    <br /> <b>&sect;</b> MobX와 Valtio 예제 비교
    <br /> 두 예제는 비스스해보이지만 2가지 큰차이점이 존재
    <br /> 1. 갱신방식, 두예제 모두 변경 가능한 상태를 사용하지만, MobX 예제는 클래스 기반인 반면 Valtio는 객체기반, 
    <br /> 스타일차이 - Valtio는 특정 스타일을 강요하지 않음, Valtio가 허용하는 스타일중 하나, 상태객체에서 함수를 분리하는것
    <App7 />
    <br /> 위 코드처름 proxy함수로 만든 상태 객체 외부에서 갱신 함수를 정의하는 것이 가능 = 코드분할 최소화, 불필요한 코드 제거 => 번들크기 최적화
    <br /> 2. 렌더링 최적화 방식, MobX는 옵저버 방식을 택하는 반면 Valtio는 훅 방식을 택함, 각 방식마다 장단점
    <br /> 옵저버방식은 더 예측 가능성이 높고 훅방식은 동시성 렌더링에 더 친화적임
    <br /> 이러한 접근 방식에 따라 구현 방식 매우 다를 수 있음 (고차컴포넌트 스타일, 훅 스타일 등 개발자 선호도차이)

    <br /><br /><div>&diams; <strong>Zustand, Jotai, Valtio 비교하기</strong></div>
    <br /> 차이점 Zustand vs Redux, 사용시점 Jotai vs Recoil, 사용 Valtio vs MobX
    <br /> 세라이브러리 모두 Poimandres(개발자집단, 깃허브조직)에서 제공, 3개의 마이크로 상태관리 라이브러리 제공, 모두 스타일이 다름
    <br /> 공통점이 있다면 API를 제공한다는 것(?). 작은 API를 제공하고 개발자의 필요에 따라 조합해서 사용
    <br /> 세라이브러리의 차이점 (2가지 측면)
    <br /> 1. 상태가 어디에 있는가?. 리액트에서 상태에 대한 두가지 방식이 있음, 하난 모듈, 다른하난 컴포넌트,
    <br /> 모듈상태: 모듈수준에서 생성되는 상태, 리액트에 속하지 않음 - Zustand, Valtio
    <br /> 컴포넌트상태: 리액트 컴포넌트 생명주기에서 생성되고 리액트에 의해 제어되는 상태 - Jotai
    <br /> Jotai 아톰 - const countAtom = atom(0); countAtom은 아템 구성객체를 보여하며, 실제값은 가지지않음, 아톰값은 Provider 컴포넌트에 저장 = 여러컴포넌트에서 재사용가능
    <br /> ㄴ 이를 Zustand, Valtio를 통해 구현하고 싶다면 리액트 컨텍스트를 사용해야함
    <br /> 반면 리액트외부에서 컴포넌트상태에 접근하는것은 기술적으로 불가능하기때문에 모듈상태를 사용해야 할 가능성 있음
    <br /> => 애플리케이션의 요구사항에 따라 모듈상태와 컴포넌트상태 중 어떤 것을 사용할지 결정, 일반적으로 전역상태에 대해 모듈/컴포넌트 상태 중 하나사용하지만 드물게 2가지 모두 사용하는것이 합리적일수도...
    <br /> 2. 상태 갱신 스타일은 무엇인가?, 
    <br /> Zustand와 Valtio사이에는 큰차이점 있음, Zustand는 불변상태 모델기반, Valtio는 변경가능한 상태모델기반 (불변상태모델은 객체생성된 후에 변경할수 없다는 것을 뜻함)
    <br /> 상태로 state=/count:0/ 있다고하면 불변상태모델에서 카운트를 갱신하려면 새로운 객체를 만들어야 함, state=/count:state.count+1/
    <br /> 변경가능한상태모델에서는 ++state.count 하면 끝, 이는 자바스크립트 객체가 본질적으로 변경가능하기때문
    <br /> 불변모델의 장점은 객체참조를 비교해서 변경사항이 있는지 파악할수 있다는것, 이는 규모가크고 중첩된 객체의 성능을 향상시키는데 도움됨. 그리고 리액트가 대체로 불변모델에 기반
    <br /> =>그래서 Zustand호환성좋음, 그래서 매우가벼운라이브러리 될수있음
    <br /> 반명 변경가능한 상태모델을 사용하는 Valtio는 두모델간의 간극을 메워야함.
    <br /> 결국 Zustand와 Valtio는 상태갱신 스타일이 다른것이라 볼수있음. 변경가능한 상태모델은 특히 객체가 깊이 중첩된 경우 편리함
    <br /> => Zustand와 Jotai에서도 상태갱신을 상태에 직접 접근해서 변경할수 있도록 Immer를 사용할수 있음
    <br /> Valtio는 Zustand와 Immer조합보다 변경 가능한 상태모델에 더 최적화돼 있다. API가 더 작고 리렌더링에 최적화되 있음
    <br /> Jotai와 Immer조합은 큰 객체를 다룰때 유용하며, Jotai라이브러리는 Immer을 통합할수 있는 기능제공 => Jotai아템크기가 작기때문에 불변갱식 방식에 큰문제 안됨
    <br />

    <br /><br /><br /><br /><br />
  </div>
  );
}

