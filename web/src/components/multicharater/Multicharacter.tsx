"use client"
import { useNuiEvent } from "@/utils/useNuiEvent";
import { debugData } from "@/utils/debugData";
import { useState } from "react";
import { setMulticharacter, Charselectstore } from "./test.store";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchNui } from "@/utils/fetchNui";
import { Transition } from "@mantine/core";

debugData([
    {
        action: "multicharacter",
        data: {
            action: "openCharacterSelection",
            data: false,
        },
    },
]);

export default function Multicharacter() {
    const [visible, setVisible] = useState<boolean>(false);
    const [sfata, setSfata] = useState<any>([]);
    const dispatch = useAppDispatch();
    const charselect = useAppSelector(Charselectstore);
    useNuiEvent("multicharacter", (data: any) => {
        console.log(JSON.stringify(data));
        if (data.action === 'openCharacterSelection') {
            setVisible(data.data);
        }
    });
    const [selectIndex, setSelectIndex] = useState(-1);
    const handleSlotClick = (index: any) => {
        dispatch(setMulticharacter({ visible: true, index: index }));
    };
    function SdelectCharacter() {
        fetchNui('multicharacter', 'selectCharacter', { id: selectIndex+1 })
    }
    return (
        <Transition
            mounted={visible}
            transition="fade"
            duration={400}
            timingFunction="ease-in-out"
        >
            {(styles) => <div style={styles}>
                    Hello
            </div>}
        </Transition>

    );
}