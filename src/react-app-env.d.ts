/// <reference types="react-scripts" />
import { FC, PropsWithChildren } from "react";


declare global {
    export type FCC<P = {}> = FC<PropsWithChildren<P>>
    export type Reducer<State, Action> = (state: State, action: Action) => State
}

