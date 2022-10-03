import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import LandinPage from './components/LandingPage'
import Home from './components/Home';
import DetailCountry from './components/DetailCountry';
import CreateActivity from './components/CreateActivity';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandinPage}/>
        <Route path='/countries' component={Home}/>
      <Route   path='/detail/:id' component={DetailCountry} />
      <Route path='/activities' component={CreateActivity} />
      </Switch> 
    </div>
    </BrowserRouter>
  );
}

export default App;
