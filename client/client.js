"use strict";(()=>{on("onResourceStart",resName=>{if(resName===GetCurrentResourceName()){console.log("NuiWrapper started!")}});var Framework=global.exports["Framework"].GetCoreObject();setImmediate(()=>{RegisterNuiCallbackType("uiMessage");on("__cfx_nui:uiMessage",(data,cb)=>{const eventName="ui:"+data.component+":"+data.event;Framework.Functions.TriggerClientCallback(eventName,function(blood){cb(blood)},data.data)})});global.exports("SendNuiMessage",(component,data)=>{SendNuiMessage(JSON.stringify({action:component,data}))});global.exports("SetNuiFocus",(hasfocus,hasCursor)=>{SetNuiFocus(hasfocus,hasCursor)});})();