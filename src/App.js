import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Signin from "./pages/Auth/Signin";
import Content from "./pages/Content/Content";
import Header from "./components/header/Header";
import ProtectedRoutes from "./protectedRoutes";
import { Box } from "@chakra-ui/layout";
import { Card } from "@chakra-ui/card";
import PersonelList from "./pages/Content/PersonelList";
import Password from "./pages/Content/Password";

function App() {
  return (
    <Box bgColor="gray.100">
      <Router>
        <Card>
          <Header />
        </Card>
        <Box m="5">
          <Routes>
            <Route path="/" element={<ProtectedRoutes component={Content} />} />
            <Route path="/personel-list" element={<ProtectedRoutes component={PersonelList}/>} />
            <Route path="/new-password" element={<ProtectedRoutes component={Password}/>} />
            <Route path="/signin" Component={Signin} />
            {/* <Route path="/new-password" Component={Password}/> */}
          </Routes>
        </Box>
      </Router>
    </Box>
  );
}
export default App;
