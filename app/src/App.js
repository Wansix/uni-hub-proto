import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Main from "./component/Main";
import Header from "./component/Header";
import Profile from "./component/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="main-container">
          <Header></Header>
          <Main></Main>
        </div>
        <div className="right-container">
          <Profile></Profile>
        </div>
      </div>
    </Router>
  );
}

export default App;
