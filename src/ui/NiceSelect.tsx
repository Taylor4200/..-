"use client"
import React, {useState, useCallback, useRef, FC, ChangeEvent, useMemo, useEffect} from "react";
import {useClickAway} from "react-use";
import {useSearchParams} from "next/navigation";

interface Option {
    value: string;
    text: string;
    data?: { value: string, label: string }[];
}

type NiceSelectProps = {
    options: Option[];
    defaultCurrent: number;
    placeholder: string;
    className?: string;
    onChange: (data: any) => void;
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
    const [current, setCurrent] = useState("");
    const [state, setState] = useState({
        category: null,
        subCategory: null,
    })
    const onClose = useCallback(() => {
        setOpen(false);
    }, []);
    const ref = useRef<HTMLDivElement | null>(null);

    const [openSelect, setOpenSelect] = useState<null | number>(null)

    useClickAway(ref, onClose);

    const currentHandler = (category: number, subCategory: number) => {
        setState({category: category, subCategory: subCategory})
        onChange({category: category, subCategory: subCategory});
        onClose();
    };

    const searchParams = useSearchParams()

    const category = searchParams.get('category')

    const subCategory = searchParams.get('subCategory')


    useEffect(() => {
        if (category && subCategory) {
            setState({category: parseInt(category), subCategory: parseInt(subCategory)})
            onChange({category: parseInt(category), subCategory: parseInt(subCategory)});
        }
    }, []);


    const getName = useMemo(() => {
        let lb;
        let lbb;
        options?.map(item => {
            if (item?.value === state.category) {
                lb = item?.text;
                item?.data?.map(data => {
                    if (data?.value === state?.subCategory) {
                        lbb = data?.label
                    }
                })
            }
        })

        if (lbb && lb) return lb + " - " + lbb
        else return undefined
    }, [state, options])

    return (
        <div
            className={`nice-select form-select-lg ${className || ""} ${open ? "open" : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => setOpen((prev) => !prev)}
            onKeyDown={(e) => e}
            ref={ref}
        >
            <span className="current">{getName ? getName : placeholder}</span>
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
                        className={`option ${item.value === current ? "selected focus" : ""
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
                                        className={`option text-black ${item.value === current ? "selected focus" : ""
                                        }`}
                                        style={{fontSize: '18px'}}
                                        role="menuitem"
                                        onClick={() => {
                                            currentHandler(item.value, data.value)
                                            // currentHandler(item?.value + " - " + data?.value)
                                            setOpenSelect(i)
                                        }}
                                        onKeyDown={(e) => e}
                                    >
                                        {data.label}
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