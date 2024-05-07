# This is a rewrite of QBCore but in Typescript. Note : This Core is Still In WIP

## There are some changes in functions for lua support
```lua
local coord = GetEntityCoords(PlayerPedId())
local coords = coord.x
local coord1 = coord.y
local coord2 = coord.z
 
local spawnclear = Framework.Functions.SpawnClear({coords, coord1, coord2}, 10);
print(spawnclear)

local spawnclear = Framework.Functions.GetGroundZCoord({coords, coord1, coord2}, 10);
print(spawnclear)

local spawnclear = Framework.Functions.GetZoneAtCoords({coords, coord1, coord2});
print(spawnclear)

local coords = GetEntityCoords(PlayerPedId())
print(json.encode(Framework.Functions.GetVehicleProperties(GetVehiclePedIsIn(PlayerPedId(), false))))

local spawnclear = Framework.Functions.GetClosestObject({coords, coord1, coord2});
print(spawnclear[1], spawnclear[2])

local spawnclear = Framework.Functions.GetClosestVehicle({coords, coord1, coord2});
print(spawnclear[1], spawnclear[2]) 
 
local closestPlayer = Framework.Functions.GetClosestPlayer({coords, coord1, coord2});
print(closestPlayer[1], closestPlayer[2])
--TypeScript or Javascript
const [var1, var2]  = Framework.Functions.GetClosestPlayer({coords, coord1, coord2});
console.log(var1, var2)
```


Thanks to Project Error for FiveM [TypeScript Boilerplate](https://github.com/project-error/fivem-typescript-boilerplate)
