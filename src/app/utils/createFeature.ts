export type ActionPayload<Value> = {
    type: string,
    payload: Value
}


type Feature = <State>(props: {
    name: string,
    initialState: State,
    reducers: {
        [name: string]: (state: State, action: any) => void
    }
}) => {
    name: string,
    initialState: State
    reducer: any
    actions: any
}

export const createFeature: Feature = ({ name, initialState, reducers }) => {

    const rootReducer = (state = initialState, action: any) => {
        reducers[action.type](state, action)
        return state
    }

    const createActions = () => {
        return Object
            .keys(reducers)
            .reduce((action, name: string) => {
                action[name] = (payload: any) => ({
                    type: name,
                    payload
                })
                return action
            }, {} as any);
    }

    return {        
        name,
        initialState,
        reducer: rootReducer,
        actions: createActions()
    }
}



