// THIS FILE REQUIRES 'react-toastify' PACKAGE TO WORK

import { toast } from 'react-toastify' ;

const addNotif = (message, type) => {
  switch(type)
  {
    case 'error' : toast.error(message, {autoClose: false, theme: "dark" }) ; break ;
    case 'success' : toast.success(message, {autoClose: 3000, theme: "dark" }) ; break ;
    case 'notif' : toast(message) ; break ;
    default : toast.info(message, {autoClose: 7000, theme: "dark" }) ;
  }

}

const remNotif = ( ) => {
  toast.dismiss() ;  
}

export {remNotif, addNotif} ;