import { useState } from "react";
import { debugData } from "@/utils/debugData";
import { useNuiEvent } from "@/utils/useNuiEvent";
import { fetchNui } from "@/utils/fetchNui";
import { Transition } from "@mantine/core";
import pageup from "../../app/assets/pageup.svg";
import pagedown from "../../app/assets/pagedown.svg";
import Image from "next/image";
import classes from "./spawn.module.css";

debugData([
  {
    action: "selection",
    data: {
      action: "openSlection",
      data: true
    },
  },
]);

function SpawnSelector() {
  const [sfata, setSfata] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedindex, setSelectedIndex] = useState(-1);
  const [selectedData, setSelectedData] = useState({} as any);
  useNuiEvent("selection", (data: any) => {
    if (data.action === "setSpawnPoints") {
      setSfata(data.data);
    }
    if (data.action === "openSlection") {
      setVisible(data.data)
    }
  });
  function handleSpawn() {
    if (selectedData.coords === undefined) return;
    fetchNui('selection', 'spawnCharacter', { coords: selectedData.coords })
  }
  return (
    <Transition
      mounted={visible}
      transition="slide-right"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => <div className={`${classes.selectorBg}`} style={{ ...styles, color: 'white', fontFamily:'a_RubricaXtCn' }}>
          Hello From Spawn Selector
      </div>}
    </Transition>
  );
}

export default SpawnSelector;