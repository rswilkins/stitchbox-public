// Component purpose: give users ability to save initial Braze connection data,
// update that data afterwards, and cancel updates if desired.
// saving new connection data at any time will rerender the App
import { React, useState } from "react"
import { CurrentConnectionData } from "./CurrentConnectionData"

export default function UpdateBrazeConnection({updateBrazeConnection}) {
    // state variable controlling editability of all input fields
    const [edit, setEdit] = useState(false)
    
    // state variables controlling the individual input field values, pulling from local storage
    // Braze connection data is defined by 3 variables: Web App API Key, SDK Endpoint, API Key
    // note that API Key & Web App API Key are different entities within Braze
    const [webKey, setWebKey] = useState(() => {
        if (CurrentConnectionData == null) return "no web key set"
        return CurrentConnectionData.webApp
    })
    const [sdkEndpoint, setSDKEndpoint] = useState(() => {
        if (CurrentConnectionData == null) return "no sdk endpoint set"
        return CurrentConnectionData.sdk
    })
    const [apiKey, setAPIKey] = useState(() => {
        if (CurrentConnectionData == null) return "no api key set"
        return CurrentConnectionData.api
    })
    
    // function for saving new connection data
    function submitData() {
        // save new data to local storage
        localStorage.setItem("stitchboxBrazeConnection", JSON.stringify({
            webApp: webKey,
            sdk: sdkEndpoint,
            api: apiKey
        }))
        // toggle edit off
        setEdit(!edit)
        // update App() state to rerender App()
        updateBrazeConnection({
            webAppAPIKey: webKey,
            sdkEndpoint: sdkEndpoint,
            restAPIKey: apiKey
        })
    }

    // function for exiting out of edit mode without saving
    function cancelChange() {
        // handle cancel action when there were no initial values to begin with
        if (CurrentConnectionData == null) {
            setWebKey("no web key set")
            setSDKEndpoint("no sdk endpoint set")
            setAPIKey("no api key set")
        // restore state variables to their initial values
        } else {
            setWebKey(CurrentConnectionData.webApp)
            setSDKEndpoint(CurrentConnectionData.sdk)
            setAPIKey(CurrentConnectionData.api)
        }
        // toggle edit off
        setEdit(!edit)
    }
    
    // returns different inputs & buttons based on edit state of the component
    return (
        <>
        <label>Web App API Key</label>
        {edit && ( <input id="webApp" value={webKey} onChange={(e) => setWebKey(e.target.value)} required></input>)}
        {!edit && ( <input disabled placeholder={webKey}></input>)}
        <label>SDK Endpoint</label>
        {edit && ( <input id="sdk" value={sdkEndpoint} onChange={(e) => setSDKEndpoint(e.target.value)} required></input>)}
        {!edit && ( <input disabled placeholder={sdkEndpoint}></input>)}
        <label>API Key</label>
        {edit && ( <input id="api" value={apiKey} onChange={(e) => setAPIKey(e.target.value)} required></input>)}
        {!edit && ( <input disabled placeholder={apiKey}></input>)}
        {!edit && ( <button onClick={() => setEdit(!edit)}>Change Connection</button>)}
        {edit && ( <button onClick={submitData}>Save Connection</button>)}
        {edit && ( <button onClick={cancelChange}>Cancel</button>)}
        </>    
    )
}