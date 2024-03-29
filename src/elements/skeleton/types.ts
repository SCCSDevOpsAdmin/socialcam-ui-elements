import * as React from 'react';

/**
 * Defines valid properties in Skeleton component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface SkeletonProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * It specifies an alternate text for an image, if the image cannot be displayed.
     * @defaultValue rectangle
     */
    shape?: 'rectangle' | 'circle' | undefined;
    /**
     * Size of the Circle or Square.
     */
    size?: string | undefined;
    /**
     * Width of the element.
     * @defaultValue 100%
     */
    width?: string | undefined;
    /**
     * Height of the element.
     * @defaultValue 1rem
     */
    height?: string | undefined;
    /**
     * Border radius of the element, defaults to value from theme.
     */
    borderRadius?: string | undefined;
    /**
     * Type of the animation, valid options are "wave" and "none".
     * @defaultValue wave
     */
    animation?: 'wave' | 'none' | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {SkeletonPassThroughOptions}
     */
}

export declare class Skeleton extends React.Component<SkeletonProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}