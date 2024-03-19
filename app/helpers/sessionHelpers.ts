'use client'

import { jwtDecode } from "jwt-decode";

// citramas_UD348 = userData
// citramas_TN903 = token
// citramas_EP728 = exp

  export const setLocalStorage = (userData:any, token:string) => {
    const exp:any = jwtDecode(token).exp;
  
    if (typeof window !== 'undefined') {
      localStorage.setItem("citramas_UD348", btoa(JSON.stringify(userData)));
      localStorage.setItem("citramas_TN903", token);
      localStorage.setItem("citramas_EP728", exp);
    }
  };
  
  export const getActiveUser = () => {
    const expirationTime = localStorage.getItem("citramas_EP728");

    if (typeof window !== 'undefined') {
      const hasToken =
        localStorage.getItem("citramas_TN903") &&
        localStorage.getItem("citramas_UD348") &&
        expirationTime !== null &&
        Date.now() < Number(expirationTime) * 1000;

        return hasToken;
    }
    
  };

  export const getUser = () => {
    try {
      let decoded = atob(localStorage.getItem("citramas_UD348") || "");
      return JSON.parse(decoded);
    } catch (e) {
      return {};
    }
  };

  export const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("citramas_TN903");
    }
  }

export const invalidateSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
}