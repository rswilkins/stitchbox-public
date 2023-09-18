import { React, useState } from "react"

export default function DynamicForm({defaultText}) {
    const [edit, setEdit] = useState(false)
    const [webKey, setWebKey] = useState("initial web key")
    const [sdkEndpoint, setSDKEndpoint] = useState("initial sdk Endpoint")
    const [apiKey, setAPIKey] = useState("initial api key")

    // the initial state values for webkey, sdk, api need to pull from local storage
    // the submitData function needs to be tested to actually set the values
    // the cancelChange function needs to return the state values to local storage values
    // the App connection state needs to be set up in App(), and then passed to DynamicForm as props
    // those Props need to be tested
    
    // IT IS WORKING!!!
    function submitData() {
        localStorage.setItem("stitchboxBrazeConnection", JSON.stringify({
            webApp: webKey,
            sdk: sdkEndpoint,
            api: apiKey
        }))
    }

    function cancelChange() {
        setWebKey("initial web key")
        setSDKEndpoint("initial sdk Endpoint")
        setAPIKey("initial api key")
        setEdit(!edit)
    }
    
    return (
        <>
        <label>Web App API Key</label>
        {edit && ( <input id="webApp" value={webKey} onChange={(e) => setWebKey(e.target.value)}></input>)}
        {!edit && ( <input disabled placeholder={webKey}></input>)}
        <label>SDK Endpoint</label>
        {edit && ( <input id="sdk" value={sdkEndpoint} onChange={(e) => setSDKEndpoint(e.target.value)}></input>)}
        {!edit && ( <input disabled placeholder={sdkEndpoint}></input>)}
        <label>API Key</label>
        {edit && ( <input id="api" value={apiKey} onChange={(e) => setAPIKey(e.target.value)}></input>)}
        {!edit && ( <input disabled placeholder={apiKey}></input>)}
        {!edit && ( <button onClick={() => setEdit(!edit)}>Change Connection</button>)}
        {edit && ( <button>Save Connection</button>)}
        {edit && ( <button onClick={cancelChange}>Cancel</button>)}
        </>    
    )
}