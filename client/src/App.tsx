import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext";
import './App.css';

import RouteList from "./routes/RouteList";
// import Loading from "./common/Loading";

import { useAuth } from "./context/UserContext";

function App() {
  const  user = useAuth();

  return (
    <div className="App"> 
      <BrowserRouter>
        <UserProvider>
          <RouteList />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
