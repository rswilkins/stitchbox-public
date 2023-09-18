// fetch Braze Connection data from local browser storage and export as mutable variable across app
export let CurrentConnectionData = JSON.parse(localStorage.getItem("stitchboxBrazeConnection"))