import { Header } from './components/Header';
import { Content } from './components/Content';
import { Provider } from 'react-redux';
import { store } from './store';
function App() {
  return (
    <Provider store={store}>

      <main className="app">
        <Header />
        <Content />
      </main>

    </Provider>
  );
}

export default App;
