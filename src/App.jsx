import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import DriverStandings from "./components/DriverStandings";
import ConstructorStandings from "./components/ConstructorStandings";
import LatestResult from "./components/LatestResult";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LatestResult />} />
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
