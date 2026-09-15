import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/app.routes";
import Navbar from "./components/layout/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
