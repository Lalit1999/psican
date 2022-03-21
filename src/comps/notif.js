// THIS FILE REQUIRES 'react-toastify' PACKAGE TO WORK
import cogoToast from 'cogo-toast';
import { toast } from 'react-toastify' ;

const notifOption = {
  position:'top-right', 
  hideAfter : 4
} ;

const addNotif = (message, type) => {
  switch(type)
  {
    case 'success' : cogoToast.success(message, notifOption); break ;
    case 'error' : cogoToast.error(message, notifOption); break ;
    case 'warn' : cogoToast.warn(message, notifOption ); break ;
    case 'notif' : cogoToast.info(message, notifOption ); break ;
    default : cogoToast.info(message, notifOption );
  }

}

const remNotif = ( ) => {
  toast.dismiss() ;  
}

export {remNotif, addNotif} ;