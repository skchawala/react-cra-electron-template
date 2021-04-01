const { ipcRenderer } = window.electron
console.log(ipcRenderer)

ipcRenderer.invoke('hello-back',{ msg:'hello from React'}).then((msg)=>{
    console.log(msg)
})
//ipcRenderer.in('hello',{ msg:'hello from React'})