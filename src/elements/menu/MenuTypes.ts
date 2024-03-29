import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';
import { CSSTransitionProps } from '../csstransition/CSSTransition';

type MenuAppendToType = 'self' | HTMLElement | undefined | null;

export interface MenuProps {
    id?: string;
    model?: MenuItem[];
    popup?: boolean;
    style?: object;
    className?: string;
    autoZIndex?: boolean;
    baseZIndex?: number;
    appendTo?: MenuAppendToType;
    transitionOptions?: CSSTransitionProps;
    onShow?(e: React.SyntheticEvent): void;
    onHide?(e: React.SyntheticEvent): void;
    children?: React.ReactNode;
}

export declare class Menu extends React.Component<MenuProps, any> {
    public toggle(event: React.SyntheticEvent): void;
    public show(event: React.SyntheticEvent): void;
    public hide(event: React.SyntheticEvent): void;
}
