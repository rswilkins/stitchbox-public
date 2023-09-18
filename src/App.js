import {React, useState} from 'react';
import './App.css';
import UpdateBrazeConnection from './UpdateBrazeConnection';

function App() {
  // entire app dependent on Braze connection details - if these change, the whole app must rerender
  const [connection, setConnection] = useState(() => {
  
    // other components save Braze connection details in local browser; initial App state uses these details if present ('' if not)
  const localValue = localStorage.getItem("stitchboxBrazeConnection")
    if (localValue == null) return {
      webAppAPIKey: '',
      sdkEndpoint: '',
      restAPIKey: ''
    }
    return {
      webAppAPIKey: JSON.parse(localValue).webApp,
      sdkEndpoint: JSON.parse(localValue).sdk,
      restAPIKey: JSON.parse(localValue).api
  }})

  // render the App
  return (
    <div className="App">
      {/* bring in UpdateBrazeConnection component, passing App() set state function as a prop */}
      <UpdateBrazeConnection updateBrazeConnection={setConnection}/>
    </div>
  );
}

export default App;
