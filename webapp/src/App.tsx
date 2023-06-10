import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import { ClientsView } from './views/client/ClientsView';
import CreateNewClientView from './views/client/CreateNewClientView';
import { OrdersView } from './views/orders/OrdersView';
import CreateNewOrderView from './views/orders/CreateNewOrderView';
import ViewOrder from './views/orders/ViewOrder';
import ConfigurationsView from './views/configurations/ConfigurationsView';
import UsersView from './views/configurations/users/UsersView';
import PreferencesView from './views/configurations/preferences/PreferencesView';
import PreferencesNewView from './views/configurations/preferences/PreferencesNewView';
import PreferencesEditView from './views/configurations/preferences/PreferencesEditView';
import UsersNewView from './views/configurations/users/UsersNewView';
import UsersEditView from './views/configurations/users/UsersEditView';
import FeaturesView from './views/configurations/features/FeatureView';
import FeaturesEditView from './views/configurations/features/FeatureEditView';
import { FeatureContextProvider } from './contexts/FeatureContext';
import RestoreView from './views/RestoreView';
import { PreferenceContextProvider } from './contexts/PreferenceContext';

function App() {
  return (
    <Router>
        <PreferenceContextProvider>
          <FeatureContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/restore' element={<RestoreView />} />
              <Route path='/clients' element={<ClientsView />} />
              <Route path='/orders' element={<OrdersView />} />

              <Route path='/configurations' element={<ConfigurationsView />} />

              <Route path='/configurations/users' element={<UsersView />} />
              <Route path='/configurations/users/new' element={<UsersNewView />} />
              <Route path='/configurations/users/edit/:userHash' element={<UsersEditView />} />

              <Route path='/configurations/preferences' element={<PreferencesView />} />
              <Route path='/configurations/preferences/new' element={<PreferencesNewView />} />
              <Route path='/configurations/preferences/edit/:preferenceSlug' element={<PreferencesEditView />} />

              <Route path='/configurations/features' element={<FeaturesView />} />
              <Route path='/configurations/features/edit/:featureSlug' element={<FeaturesEditView />} />

              <Route path='/clients/new' element={<CreateNewClientView />} />
              <Route path='/orders/new' element={<CreateNewOrderView />} />
              <Route path='/orders/:orderId' element={<ViewOrder />} />
            </Routes>
            </FeatureContextProvider>
        </PreferenceContextProvider>
      </Router>
  );
}

export default App;
