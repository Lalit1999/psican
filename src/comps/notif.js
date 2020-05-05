// THIS FILE REQUIRES 'react-notifications-component' PACKAGE TO WORK

import { store } from 'react-notifications-component' ;

const successObj = {
  title: "Success!",
  type: "success",
  container: "bottom-right",
  dismiss: {
    duration: 3000,
    onScreen: true
  }
} ;

const errorObj = {
  title: "Error!",
  type: "danger",
  container: "bottom-right",
  dismiss: {
    duration: 3000,
    onScreen: true
  }
} ;

const notifObj = {
  title: "Loading...",
  type: "info",
  container: "bottom-right",
  dismiss: {
    duration: 5000,
    onScreen: true
  }
} ;

const addNotif = (message, type) => {
  let obj = {} ;
  switch(type)
  {
    case 'error' : obj = errorObj ; break ;
    case 'success' : obj = successObj ; break ;
    default : obj = notifObj ;
  }

  obj.message = message ;
  return store.addNotification(obj) ;
}

const remNotif = (id) => {
  store.removeNotification(id) ;  
}

export {remNotif, addNotif} ;