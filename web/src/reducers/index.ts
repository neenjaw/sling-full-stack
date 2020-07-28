import { combineReducers, CombinedState } from 'redux'
import { reducer as reducerForm, FormStateMap } from 'redux-form'

interface SlingState {
  form: FormStateMap
}

export enum SlingActionKeys {
  LOGOUT = 'LOGOUT'
}

interface LogoutAction {
  type: typeof SlingActionKeys.LOGOUT
}

export type SlingActionTypes = LogoutAction

const appReducer = combineReducers({
  form: reducerForm,
})

export default (state: CombinedState<SlingState> | undefined, action: SlingActionTypes) => {
  if (action.type === SlingActionKeys.LOGOUT) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}