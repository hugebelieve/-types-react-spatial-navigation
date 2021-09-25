/* tslint:disable:class-name */
declare module "@noriginmedia/react-spatial-navigation/dist/spatialNavigation" {
  type OnUpdateFocusCb = (bool: boolean) => any;
  interface KeyMap {
    left: number;
    right: number;
    up: number;
    down: number;
    enter: number;
  }
  interface FocusableComponent {
    focusKey: string;
    node: any;
    parentFocusKey: string;
    /* Unsure of typings for these callbacks (undocumented) */
    onEnterPressHandler: (...args: any[]) => any;
    onArrowPressHandler: (...args: any[]) => any;
    onBecameFocusedHandler: (...args: any[]) => any;
    onUpdateFocus: (focused: boolean) => any;
    onUpdateHasFocusedChild: (hasFocusedChild: boolean) => any;
    forgetLastFocusedChild: boolean;
    trackChildren: boolean;
    lastFocusedChildKey: string | null;
    preferredChildFocusKey: string | null;
    focusable: boolean;
  }
  class SpatialNavigation {
    public paused: boolean;
    private focusableComponents: Record<string, FocusableComponent>;
    private focusKey: string | null;
    private parentsHavingFocusedChild: FocusableComponent[];
    private enabled: boolean;
    private nativeMode: boolean;
    private throttle: number;
    private paused: boolean;
    private keyDownEventListener: null | any;
    private keyUpEventListener: null | any;
    private keyMap: KeyMap;

    private debug: boolean;
    private visualDebugger: null | any;
    private logIndex: number;

    public setFocus(focusKey: string): void;
    public pause(): void;
    public resume(): void;
    public init(): void;
    public setKeyMap(): void;
  }
  const spatialNavigationInst: SpatialNavigation;
  export = spatialNavigationInst;
}
declare module "@noriginmedia/react-spatial-navigation" {
  import { PropsApplicableToHOC, withFocusableProps } from "@noriginmedia/react-spatial-navigation";
  import * as React from "react";
  function initNavigation(opts?: initNavigationOpts): any;
  interface initNavigationOpts {
    debug?: boolean;
    visualDebug?: boolean;
    nativeMode?: boolean;
    throttle?: number;
  }

  function setKeyMap(opts: setKeyMapOpts): any;
  interface setKeyMapOpts {
    left?: number;
    up?: number;
    right?: number;
    down?: number;
    enter?: number;
  }

  /* https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/ADVANCED.md#higher-order-components-hocs */
  interface withFocusableProps {
    focusKey: string;
    realFocusKey: string;
    parentFocusKey: string;
    preferredChildFocusKey: string;
    focused: boolean;
    hasFocusedChild: boolean;
    setFocus: (focusKey?: string) => void;
    stealFocus: () => void;
    pauseSpatialNavigation: () => void;
    resumeSpatialNavigation: () => void;
  }
  type Direction = "up" | "down" | "left" | "right";
  interface onBecameFocusedRect {
    x: number;
    y: number;
    top: number;
    left: number;
    width: number;
    height: number;
    node: Element;
  }
  /* From the docs: "All these properties are optional". It is your responsibility to pass them in. */
  interface PropsApplicableToHOC<P> {
    focusable?: boolean;
    trackChildren?: boolean;
    autoRestoreFocus?: boolean;
    blockNavigationOut?: boolean;
    forgetLastFocusedChild?: boolean;
    focusKey?: string;
    onEnterPress?: () => void;
    /**
     * @param direction
     * @return false to prevent default navigation behaviour.
     */
    onArrowPress?: (d: Direction, o: P) => boolean;
    onBecameFocused?: (rect: onBecameFocusedRect, ownProps: P, other: {event?: any, other?: any}) => void;
  }

  function withFocusable(
    opts?: withFocusableOpts
  ): <P>(
    component: (React.ComponentType<P> | React.FunctionComponent<T>)
  ) => React.ComponentClass<Optionalize<P, withFocusableProps> & PropsApplicableToHOC<P>>;
  // ): (component: React.ComponentType<P>) => React.ComponentClass<Optionalize<PropsApplicableToHOC<P>, withFocusableProps> & P>;

  interface withFocusableOpts {
    trackChildren?: boolean;
    forgetLastFocusedChild?: boolean;
    autoRestoreFocus?: boolean;
    blockNavigationOut?: boolean;
  }

  /* https://github.com/typescript-cheatsheets/typescript-utilities-cheatsheet */
  type Optionalize<T extends K, K> = Omit<T, keyof K>;
}
