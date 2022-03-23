import {createContext, useState} from 'react' ;

const UserContext = createContext() ;

const UserContextProvider = ({children}) => {
	const [user, setUser] = useState(localStorage.getItem('psymentUser')?JSON.parse(localStorage.getItem('psymentUser')):{}) ; 
	const [userToken, setUserToken] = useState(localStorage.getItem('psymentUserToken')?localStorage.getItem('psymentUserToken'):'') ;

	const loadUser = (user) => {
		if(user.user) {
			setUser(user.user) ;
			setUserToken(user.token) ;
			localStorage.setItem('psymentUser', JSON.stringify(user.user) );
			localStorage.setItem('psymentUserToken', user.token);
		}	
		else if(user.name)
		{
			setUser(user) ;
			localStorage.setItem('psymentUser', JSON.stringify(user.user) );
		}
		else {
			setUser({}) ;
			setUserToken('') ;
			localStorage.clear() ;
		}
	}

	return (
		<UserContext.Provider value={ { user, token: userToken, loadUser } }>
			{children}
		</UserContext.Provider>
	) ;
}

export {UserContext, UserContextProvider} ;