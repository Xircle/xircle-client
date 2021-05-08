/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import colors from '../../constants/colors';
import { css } from '@emotion/react';
import { Interest } from '../../store/modules/articles';
import ScrollMenu from 'react-horizontal-scrolling-menu';

export function MenuItem({ 
    text, 
    selected, 
    cssStyle 
}: { text: string, selected: string, cssStyle?: string }) {
    return (
        <div 
            css={css`
                margin: 0 5px;
                padding: 8px 20px;
                border-radius: 20px;
                color: ${selected ? '#fff' : colors.grey300};
                background-color: ${selected ? colors.blue500 : '#fff'};
                box-shadow: ${selected ? '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1)' : null};
                cursor: pointer;
            `}
        >
            {text}
        </div>
    )
};

export const MenuList = (list: option[], selected: string) => {
    return list.map(el => 
        <MenuItem 
            key={el.name} 
            text={el.name + `(${el.count})`} 
            selected={selected} 
        />
    );
}

interface option {
    name: string
    count?: number
}
export interface NavigationScrollerProps {
    activeOptions: option[];
    onClick: (option: any) => void;
    active: string | Interest;
}

function NavigationScroller({ 
    activeOptions,
    onClick,
    active
}: NavigationScrollerProps) {
    const [list, setList] = useState(activeOptions);
    const [selected, setSelected] = useState<string>(active);
    const [menuItems, setMenuItems] = useState(() => MenuList(list, selected));

    const onSelect = (key: string | number | null) => {
        setSelected(key as string);
    }

    return (
        <ScrollMenu
            data={menuItems}
            selected={selected}
            onSelect={onSelect}
            scrollToSelected
        />
    );
}


export default NavigationScroller;