import { BrowserRouter as Router } from "react-router-dom";
import useToken from "./hooks/useToken";
import MapRoutes from "./routes/MapRoutes";

export default function App() {
  const [token, setToken] = useToken();
  return (
    <Router>
      <MapRoutes />
    </Router>
  );
}
