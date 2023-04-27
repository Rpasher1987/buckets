import React from 'react';
import ReactDOM from 'react-dom';


//Get today's date
export function setDate(name) {
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return `Hello ${name}, Today's date is ${date}.`;
}


