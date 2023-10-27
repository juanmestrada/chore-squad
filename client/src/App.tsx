import './App.css';
import { useAuth } from "./context/UserContext";
import ToastContainer from 'react-bootstrap/ToastContainer';
import ErrorAlert from "./components/alerts/ErrorAlert";
import SuccessAlert from './components/alerts/SuccessAlert';
import RouteList from "./routes/RouteList";

function App() {
  const {errorMessage, setErrorMessage, successMessage, setSuccessMessage} = useAuth();

  return (
    <div className="App">
      {(errorMessage || successMessage) && (
        <ToastContainer  className="position-fixed bottom-0 end-0">
          {errorMessage && (<ErrorAlert message={errorMessage} clearmessage={setErrorMessage} />)}
          {successMessage && (<SuccessAlert message={successMessage} clearmessage={setSuccessMessage} />)}
        </ToastContainer>
      )}
  
      <RouteList />
    </div>
  );
}

export default App;
