// THIS FILE REQUIRES 'react-toastify' PACKAGE TO WORK

import { toast } from 'react-toastify' ;

const addNotif = (message, type) => {
  switch(type)
  {
    case 'error' : toast.error(message, {autoClose: 7000}) ; break ;
    case 'success' : toast.success(message, {autoClose: 7000}) ; break ;
    case 'notif' : toast(message) ; break ;
    default : toast.info(message, {autoClose: 7000}) ;
  }

}

// const remNotif = (id) => {
//   store.removeNotification(id) ;  
// }

// export {remNotif, addNotif} ;

export {addNotif} ;