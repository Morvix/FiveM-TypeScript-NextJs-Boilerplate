# FiveM-TypeScript-NextJs-Bolierplate
## This is a new FiveM NextJs Boilerplate, this Bolierplate can hold Multiple Ui in it and can new integrated to different scripts using below snippets
1. exports["FiveM-TypeScript-NextJs-Boilerplate"].SendNuiMessage(action, data) : SendNuiMessage will not work with this Bolieplate as this is a whole standalone UI handler you need to use this exports
2. exports["FiveM-TypeScript-NextJs-Boilerplate"].SetNuiFocus(true, true) : Same You have to use this exports

# Note : If you are using this Ui handler then instead of using RegisterNuiCallback you have to use my TriggerClientCallbacks i have displayed one Example :

  ```ui:```This Prefix is Very Important, so whenever you click of FetchNui it uses this Prefix For Example Event Name Should be ```ui:scriptname:Unique name``` like ```ui:multicharacter:selectCharacter``` and on UI side
  ```fetchNui('multicharacter', 'selectCharacter', { id: selectIndex+1 })``` in fetchNui first Parameter Should be Script name and Second Parameter Should Be Unique Name and Third Parameter is For Data you want to send
  
```ts
Framework.Functions.CreateClientCallback('ui:multicharacter:selectCharacter', function (cb: any, data: any) {
  // data is Varidable That Contains The Data Which Is Send From Nui
            Cams.pointCameraToCharacter(data.id);
            cb("OK");
});
```
```lua
Framework.Functions.CreateClientCallback('ui:multicharacter:selectCharacter', function (cb, data)

    -- data is Varidable That Contains The Data Which Is Send From Nui
    print(json.encode(data))
    cb("Ok")
end)
```
# Note : debugData action is the script name and Rest is Same  and useNuiEvent contains the name of the script like multicharacter and while
sending Nui Message using Lua or Ts you have to do like this: <br>```exports["FiveM-TypeScript-NextJs-Boilerplate"].SendNuiMessage(action, data)``` action will be script name and data is what you want to send <br>```exports["FiveM-TypeScript-NextJs-Boilerplate"].SendNuiMessage("multicharacter", { action: 'openCharacterSelection', data: false })```
```tsx
debugData([
    {
        action: "multicharacter",
        data: {
            action: "openCharacterSelection",
            data: false,
        },
    },
]);
useNuiEvent("multicharacter", (data: any) => {
        console.log(JSON.stringify(data));
        if (data.action === 'openCharacterSelection') {
            setVisible(data.data);
        }
});
```

#

**Note : If you are taking on the Ui Folder and Integrating it to Seprate Scripts then you have to make Changes fetchNui Function In utils Folder**
 1. Goto fetchNui.ts and replace it with below Function
```ts
export async function fetchNui<T = any>(eventName: string, data?: any, mockData?: T): Promise<T> {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  if (isEnvBrowser() && mockData) return mockData;

  const resourceName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : 'nui-frame-app';

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);

  const respFormatted = await resp.json()

  return respFormatted
}
```
Need help then DM me : morvix.ts