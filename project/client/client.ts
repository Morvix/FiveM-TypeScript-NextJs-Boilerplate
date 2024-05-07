on('onResourceStart', (resName: string) => {
    if (resName === GetCurrentResourceName()) {
        console.log('NuiWrapper started!')
    }
})

export const Framework = global.exports["Framework"].GetCoreObject();

setImmediate(() => {
    RegisterNuiCallbackType("uiMessage");
    on("__cfx_nui:uiMessage", (data: any, cb: any) => {
        const eventName = "ui:" + data.component + ":" + data.event;
        Framework.Functions.TriggerClientCallback(eventName, function (blood: any) {
            cb(blood);
        }, data.data);
    });
})

global.exports("SendNuiMessage", (component: string, data: any) => {
    SendNuiMessage(
        JSON.stringify({
            action: component,
            data: data
        })
    );
})

global.exports("SetNuiFocus", (hasfocus: boolean, hasCursor: boolean) => {
    SetNuiFocus(hasfocus, hasCursor)
})