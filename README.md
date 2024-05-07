# FiveM-TypeScript-NextJs-Boilerplate

## Overview
This is a new FiveM NextJs Boilerplate, which can manage multiple UIs and can be integrated into different scripts using the exports outlined below.

## Important Exports
1. `exports["FiveM-TypeScript-NextJs-Boilerplate"].SendNuiMessage(action, data)`: Replace `SendNuiMessage` with this export as it is a standalone UI handler.
2. `exports["FiveM-TypeScript-NextJs-Boilerplate"].SetNuiFocus(true, true)`: Use this export to set NUI focus.

## Customizing NUI Callbacks
Instead of using `RegisterNuiCallback`, use `TriggerClientCallbacks`. Below is an example to demonstrate usage:

### Usage Example
The prefix `ui:` is critical. For instance, the event name should be structured like `ui:scriptname:UniqueName`, such as `ui:multicharacter:selectCharacter`. On the UI side, use:

```typescript
Framework.Functions.CreateClientCallback('ui:multicharacter:selectCharacter', function (cb: any, data: any) {
    // data contains the information sent from Nui
    Cams.pointCameraToCharacter(data.id);
    cb("OK");
});
```

```lua
Framework.Functions.CreateClientCallback('ui:multicharacter:selectCharacter', function (cb, data)
    -- data contains the information sent from Nui
    print(json.encode(data))
    cb("Ok")
end)
```
## Additional Information

### Sending NUI Messages
Use the following exports to send NUI messages. The `action` should be the script name, and `data` is the content you want to send.

```js
exports["FiveM-TypeScript-NextJs-Boilerplate"].SendNuiMessage(action, data)
```

Example:
```js
exports["FiveM-TypeScript-NextJs-Boilerplate"].SendNuiMessage("multicharacter", { action: 'openCharacterSelection', data: false })
```

### Handling NUI Events
To handle NUI events, use the `debugData` and `useNuiEvent` as shown in the example below:

```typescript
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


### Modifying fetchNui
If you are integrating the UI folder into separate scripts, you need to modify the `fetchNui` function in the `utils` folder as follows:

```typescript
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

    const respFormatted = await resp.json();

    return respFormatted;
}
```

## Support
For additional help, DM me: morvix.ts
