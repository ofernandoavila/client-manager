import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import { ClientsView } from './views/client/ClientsView';
import CreateNewClientView from './views/client/CreateNewClientView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/clients' element={<ClientsView />} />
        <Route path='/clients/new' element={<CreateNewClientView />} />
      </Routes>
    </Router>
  );
}

export default App;
