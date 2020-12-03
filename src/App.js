import './App.css';
import Header from './components/Header/Header'
import Footer from './components/Footer/index'
import Mapview from './components/Mapview/Mapview'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './containers/Home/index'
import Login from './containers/Login/index'
import Signup from './containers/Signup/index'
import Publica from './containers/Publica/index'

function App() {
  return (
    <div className="App">
     
      
      <Router>
        <div className="App">
             <Header/>
             <Switch>
              
             <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/Mapview" component={Mapview} />
              <Route path="/publica"  component={Publica} />
              <Route path="/"  component={Home} />
             
            </Switch>
            
            <Footer/>
        </div>
      </Router>
     
    </div>
  );
}

export default App;
