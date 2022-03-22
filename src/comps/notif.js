// THIS FILE REQUIRES 'cogo-toast' PACKAGE TO WORK
import cogoToast from 'cogo-toast';

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

export {addNotif} ;