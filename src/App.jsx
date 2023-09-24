import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import DriverStandings from "./component/DriverStandings";
import ConstructorStandings from "./component/ConstructorStandings";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={"/driver-standings"} />} />
          <Route path="/driver-standings" element={<DriverStandings />} />
          <Route
            path="/constructor-standings"
            element={<ConstructorStandings />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
