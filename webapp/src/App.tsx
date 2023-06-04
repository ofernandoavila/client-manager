import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import { ClientsView } from './views/client/ClientsView';
import CreateNewClientView from './views/client/CreateNewClientView';
import { OrdersView } from './views/orders/OrdersView';
import CreateNewOrderView from './views/orders/CreateNewOrderView';
import ViewOrder from './views/orders/ViewOrder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/clients' element={<ClientsView />} />
        <Route path='/orders' element={<OrdersView />} />
        <Route path='/clients/new' element={<CreateNewClientView />} />
        <Route path='/orders/new' element={<CreateNewOrderView />} />
        <Route path='/orders/:orderId' element={<ViewOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
