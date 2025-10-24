# book_react_micro
리액트 훅을 활용한 마이크로 상태 관리 책 공부

![cover](./msmrh-main/cover.jpg)

# 리액트 훅을 활용한 마이크로 상태 관리
### 리액트 상태 관리의 기본 개념부터 동작 원리와 문제 해결, 렌더링 최적화 기법까지

- **다이시 카토** 지음 | **이선협, 김지은** 옮김

이 책에서는 다양한 상태 관리 방법과 유명한 상태 관리 라이브러리인 Zustand, Jotai, Valtio, React Tracked의 사용법을 소개한다. 또한 실무에서 유용하게 활용할 수 있는 여러 사용 사례에 대한 패턴과 리렌더링 최적화에 대한 내용을 다룬다.

이 책을 처음부터 끝까지 정독하면 리액트에서 상태를 관리하는 방법과 원리를 비롯해 애플리케이션 요구사항에 적합한 상태 관리 라이브러리를 선택할 수 있을 것이다.

**★ 이 책에서 다루는 내용 ★**

- 마이크로 상태 관리의 개념과 구현
- 지역 상태와 전역 상태의 개념과 구현
- 리액트 컨텍스트를 통한 전역 상태 관리
- 모듈 상태를 통한 전역 상태 관리
- 리렌더링 최적화
- Zustand, Jotai, Valtio, React Tracked의 사용법과 동작 원리
- 여러 상태 관리 라이브러리의 장단점 비교
- 요구사항에 적합한 라이브러리 선택 방법


**★ 목차 ★**
1부 리액트 훅과 마이크로 상태 관리
01. 리액트 훅을 이용한 마이크로 상태 관리
2부 전역 상태에 대한 기초적인 접근법
02. 지역 상태와 전역 상태 사용하기
03. 리액트 컨텍스트를 이용한 컴포넌트 상태 공유
04. 구독을 이용한 모듈 상태 공유
05. 리액트 컨텍스트와 구독을 이용한 컴포넌트 상태 공유
3부 라이브러리 구현 및 용도
06. 전역 상태 관리 라이브러리 소개
07. 사용 사례 시나리오 1: Zustand
08. 사용 사례 시나리오 2: Jotai
09. 사용 사례 시나리오 3: Valtio
10. 사용 사례 시나리오 4: React Tracked
11. 세 가지 전역 상태 라이브러리의 유사점과 차이점 (Zustand, Jotai, Valtio)



**★ 이 책에서 소프트웨어/하드웨어 ★**
- Node.js 14 : 윈도우, macOS, 리눅스
- 리액트 17/create-react-app 4 : 구글 크롬
- ECMAScript 2015/타입스크립트 4
- npm add -D sass-embedded
- npm install redux
- npm install use-subscription
- npm install react-redux
- npm install zustand@4
- npm install jotai
- npm install valtio
- npm install @react-spring/web : transition
- npm install react-tracked // 렌더링최적화


-----------------------------------------------------------------------------------------------------------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
