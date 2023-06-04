import React, { useEffect, useState } from "react";
import CreateClientForm from "./forms/CreateClientForm";
import MenuHeader from "./components/MenuHeader";
import ClientGrid from "./views/client/components/ClientsGrid";

import { ClientAPI } from "./api/ClientAPI";

import { ClientType } from "./types/ClientType";

function App() {
  const [clients, setClients] = useState<Array<ClientType>>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  const fetchData = async () => {
    let data = await ClientAPI.getClients();
    setClients(data);
    setIsLoaded(true);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoaded) {
    return (
      <>
        {/* Conteúdo quando os dados estiverem carregados */}
      </>
    );
  }

  return (
    <>
      <MenuHeader />
      <main role="main ">
        <div className="container pt-5">
            { alertMessage ? (
                <div className="alert alert-primary" role="alert" dangerouslySetInnerHTML={ {__html: alertMessage} }></div>
            ) : ''}
          <div className="row">
            <div className="col-sm px-5 py-3 bg-light">
              <CreateClientForm fetch={fetchData} alert={setAlertMessage} />
            </div>
            <div className="col-sm">
              <ClientGrid onFectch={fetchData} onAlert={setAlertMessage} clients={clients} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
