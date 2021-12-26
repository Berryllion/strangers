import { ReduxState } from "..";

/* Actions */
export const SET_THEME = 'SET_THEME';

/* Types */
export interface SetThemeAction {
  type: typeof SET_THEME;
  payload: Array<string>;
}

export type Actions = SetThemeAction;

/* Functions */
export function setTheme(state: ReduxState, action: SetThemeAction): ReduxState {
  return {
    ...state,
    theme: {
      currentTheme: action.payload,
    }
  };
}

/* Dispatches */
export const dispatches = [
  {
    action: SET_THEME,
    function: setTheme,
  },
];
