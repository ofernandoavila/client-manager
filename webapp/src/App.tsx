import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import { ClientsView } from './views/client/ClientsView';
import CreateNewClientView from './views/client/CreateNewClientView';
import { OrdersView } from './views/orders/OrdersView';
import CreateNewOrderView from './views/orders/CreateNewOrderView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/clients' element={<ClientsView />} />
        <Route path='/orders' element={<OrdersView />} />
        <Route path='/clients/new' element={<CreateNewClientView />} />
        <Route path='/orders/new' element={<CreateNewOrderView />} />
      </Routes>
    </Router>
  );
}

export default App;
