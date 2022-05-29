import './App.css';
import {Route} from "react-router-dom"
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import FormularioDog from './components/FormularioDogs/FormularioDogs';

function App() {
  return (
    <>
      
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/dog" component={FormularioDog}/>
      <Route exact path="/dogs" component={Home}/>
    </>
  );
}

export default App;
