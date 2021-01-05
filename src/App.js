// import logo from './logo.svg';
import './App.css';
import UserTable from './components/UserTable'
import LoginPage from './components/LoginPage'

import Button from '@material-ui/core/Button'

function App() {

  return (
    <div className="App">
      <div style={{ padding: "10%" }}>
        Mafia game

        <div  style={{ "borderStyle": "dotted" }}>
          <h2>User list table</h2>
          <UserTable/>
        </div>
        
        
        {/* Buttons */}
        <div  style={{ "borderStyle": "dotted" }}>
          <h2>Login page</h2>
          <LoginPage/>
        </div>
        <br/>
        <Button variant="contained">I am ready</Button>
        <br/>
        <Button variant="contained">Start game</Button>
        
      </div>
      
    </div>
  );
}

export default App;
