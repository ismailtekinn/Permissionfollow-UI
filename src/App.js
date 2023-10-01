import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Signin from "./pages/Auth/Signin";
import Content from "./pages/Content/Content";
import Header from "./components/header/Header";
import ProtectedRoutes from "./protectedRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header/>
        </div>
     <Routes>
        <Route path="/" element = {<ProtectedRoutes component={Content}/>} />
        <Route path="/signin" Component={Signin}/>
      
      </Routes>
       
      </Router>
    </div>
  );
}

export default App;
