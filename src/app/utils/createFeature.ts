export type ActionPayload<PayloadType = never> = {
    type: string,
    payload: PayloadType
}

type Feature = <State>(props: {
    name: string,
    initialState: State,
    reducers: {
        [name: string]: (state: State, action: ActionPayload) => void
    }
}) => {
    name: string,
    initialState: State
    reducer: any
    actions: {
        [name: string]: (payload?: any) => void
    }
}


type ActionList = {
    [key: string]: (payload?: ActionPayload) => void
}


export const createFeature: Feature = ({ name, initialState, reducers }) => {

    const rootReducer = (state = initialState, action: ActionPayload) => {
        reducers[action.type](state, action);
        return state
    }

    const createActions = () => {
        return Object
            .keys(reducers)
            .reduce((action, name: string) => {
                action[name] = (payload?: ActionPayload) => ({
                    type: name,
                    payload
                })
                return action
            }, {} as ActionList);
    }

    return {        
        name,
        initialState,
        reducer: rootReducer,
        actions: createActions()
    }
}



