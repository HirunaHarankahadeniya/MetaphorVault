import './App.css';
import {SearchPage} from "./pages/search_page"
import MetaphorAppBar from './components/app_bar';

function App() {
  return (
    <div className="App">
      <MetaphorAppBar/>
      <SearchPage/>
    </div>
  );
}

export default App;
