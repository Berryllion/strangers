import { ReduxState } from "..";

/* Actions */
export const SET_GAME_LEVEL = 'SET_GAME_LEVEL';
export const SET_GAME_LEVELS_AVAILABLE = 'SET_GAME_LEVELS_AVAILABLE';
export const SET_CARDS_AVAILABLE = 'SET_CARDS_AVAILABLE';

/* Types */
export interface SetGameAction {
  type: typeof SET_GAME_LEVEL;
  payload: number;
}
export interface SetGameLevelsAvailableAction {
  type: typeof SET_GAME_LEVELS_AVAILABLE;
  payload: number;
}
export interface SetCardsAvailableAction {
  type: typeof SET_CARDS_AVAILABLE;
  payload: {
    level1: Array<{
        deck: string,
        card: string,
      }>,
      level2: Array<{
        deck: string,
        card: string,
      }>,
      level3: Array<{
        deck: string,
        card: string,
      }>,
      finalCard: Array<{
        deck: string,
        card: string,
      }>,
  };
}

export type Actions = SetGameAction | SetGameLevelsAvailableAction |
  SetCardsAvailableAction;

/* Functions */
export function setGameLevel(state: ReduxState, action: SetGameAction): ReduxState {
  return {
    ...state,
    game: {
      ...state.game,
      level: action.payload,
    },
  };
}
export function setGameLevelsAvailable(state: ReduxState, action: SetGameLevelsAvailableAction): ReduxState {
  return {
    ...state,
    game: {
      ...state.game,
      levelsAvailable: action.payload,
    },
  };
}
export function SetCardsAvailable(state: ReduxState, action: SetCardsAvailableAction): ReduxState {
  return {
    ...state,
    game: {
      ...state.game,
      cards: action.payload,
    },
  };
}

/* Dispatches */
export const dispatches = [
  {
    action: SET_GAME_LEVEL,
    function: setGameLevel,
  },
  {
    action: SET_GAME_LEVELS_AVAILABLE,
    function: setGameLevelsAvailable,
  },
  {
    action: SET_CARDS_AVAILABLE,
    function: SetCardsAvailable,
  },
];
