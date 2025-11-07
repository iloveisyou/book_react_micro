import { Provider } from 'react-redux';
import { store } from './06_reduxStore';
import { Counter } from './06_reduxCounter';

export const App = () => (
  <Provider store={store}>
    <div>
      <Counter />
      <Counter />
    </div>
    </Provider>
  );