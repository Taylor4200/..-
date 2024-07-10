"use client"
import React, {useState, useCallback, useRef, FC, ChangeEvent} from "react";
import {useClickAway} from "react-use";

interface Option {
    value: string;
    text: string;
    data?: string[]
}

type NiceSelectProps = {
    options: Option[];
    defaultCurrent: number;
    placeholder: string;
    className?: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    name: string;
}

const NiceSelect: FC<NiceSelectProps> = ({
                                             options,
                                             defaultCurrent,
                                             placeholder,
                                             className,
                                             onChange,
                                             name,
                                         }) => {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState<Option>(options[defaultCurrent]);
    const [currentOpt, setCurrentOpt] = useState("")
    const onClose = useCallback(() => {
        setOpen(false);
    }, []);
    const ref = useRef<HTMLDivElement | null>(null);

    const [openSelect, setOpenSelect] = useState<null | number>(null)

    useClickAway(ref, onClose);

    const currentHandler = (item: Option) => {
        setCurrent(item);
        onChange({target: {value: item.value}} as ChangeEvent<HTMLSelectElement>);
        onClose();
    };

    return (
        <div
            className={`nice-select form-select-lg ${className || ""} ${open ? "open" : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => setOpen((prev) => !prev)}
            onKeyDown={(e) => e}
            ref={ref}
        >
            <span className="current">{current?.text + " - " + currentOpt || placeholder}</span>
            <ul
                className="list"
                role="menubar"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
            >
                {options?.map((item, i) => (
                    <li
                        key={i}
                        data-value={item.value}
                        className={`option ${item.value === current?.value ? "selected focus" : ""
                        }`}
                        style={{fontSize: '18px'}}
                        role="menuitem"
                        // onClick={() => currentHandler(item)}
                        onClick={() => {
                            setOpenSelect(i)
                        }}
                        onKeyDown={(e) => e}
                    >
                        {item.text}

                        {
                            openSelect === i ? <ul style={{paddingLeft: 0, backgroundColor: "#F5F5F8"}}>
                                {
                                    item?.data?.map((data, index) => <li
                                        key={index}
                                        data-value={item.value}
                                        className={`option text-black ${item.value === current?.value ? "selected focus" : ""
                                        }`}
                                        style={{fontSize: '18px'}}
                                        role="menuitem"
                                        onClick={() => {
                                            currentHandler(item)
                                            setCurrentOpt(data)
                                            setOpenSelect(i)
                                        }}
                                        onKeyDown={(e) => e}
                                    >
                                        {data}
                                    </li>)
                                }
                            </ul> : null
                        }

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NiceSelect;