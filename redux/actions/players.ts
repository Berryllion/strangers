import { ReduxState } from "..";

/* Actions */
export const SET_PLAYERS = 'SET_PLAYERS';

/* Types */
export interface SetPlayerssAction {
  type: typeof SET_PLAYERS;
  payload: Array<string>;
}

export type Actions = SetPlayerssAction;

/* Functions */
export function setPlayerss(state: ReduxState, action: SetPlayerssAction): ReduxState {
  return {
    ...state,
    players: action.payload,
  };
}

/* Dispatches */
export const dispatches = [
  {
    action: SET_PLAYERS,
    function: setPlayerss,
  },
];
