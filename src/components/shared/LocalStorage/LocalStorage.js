"use client"

import { isObject } from "lodash";

export const setLocalStorage = (key, value) => {
  const val = !value ? null : value;
  if (typeof window !== 'undefined') {
    if (typeof val === 'object') {
      localStorage.setItem(key, JSON.stringify(val));
    } else {
      localStorage.setItem(key, val);
    }
  }
};

export const getLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    // const val = !value _. ? null : value;
    // _.isObject(null)
    // console.log(isObject(value));
    if (value && value !== "undefined" && value !== 'null') {
      return value;
    } else {
      return null;
    }
  }
  return null;
};


export const getuserStorage = (key) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    const val = !value ? null : value;
    return val ? JSON.parse(value) : null;
  }
  return null;
};

export const removeLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};


export const setCookie = (value) => {
  if (typeof window !== 'undefined') {
    document.cookie = `refreshToken=${value}; path=/; samesite=strict; secure`;
  }
};

export const getCookie = (name) => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
    return cookies ? cookies.split('=')[1] : null;
  }
  return null;
};


export const deleteCookie = (name) => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=; path=/; Max-Age=0; SameSite=Strict; Secure`;
  }
};
