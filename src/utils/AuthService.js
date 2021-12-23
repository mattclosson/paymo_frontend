import React from 'react';
import { useAuthDispatch, logout, useAuthState } from '../Context';

export default function authHeader(props) {
    const token = props.token;
  
    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }