import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from '../redux';
import { SET_PLAYERS } from '../redux/actions/players';

// import axios from 'axios';
// import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import Home from './home/index.page';

export default function Index() {
  return (
    <Home />
  )
}
