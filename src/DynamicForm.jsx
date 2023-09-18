import { React, useState } from "react"

export default function DynamicForm({defaultText}) {
    const [edit, setEdit] = useState(false)
    const [webKey, setWebKey] = useState(JSON.parse(localStorage.getItem("stitchboxBrazeConnection")).webApp)
    const [sdkEndpoint, setSDKEndpoint] = useState(JSON.parse(localStorage.getItem("stitchboxBrazeConnection")).sdk)
    const [apiKey, setAPIKey] = useState(JSON.parse(localStorage.getItem("stitchboxBrazeConnection")).api)
    
    // IT IS WORKING!!!
    function submitData() {
        localStorage.setItem("stitchboxBrazeConnection", JSON.stringify({
            webApp: webKey,
            sdk: sdkEndpoint,
            api: apiKey
        }))
        setEdit(!edit)
    }

    function cancelChange() {
        setWebKey(JSON.parse(localStorage.getItem("stitchboxBrazeConnection")).webApp)
        setSDKEndpoint(JSON.parse(localStorage.getItem("stitchboxBrazeConnection")).sdk)
        setAPIKey(JSON.parse(localStorage.getItem("stitchboxBrazeConnection")).api)
        setEdit(!edit)
    }
    
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