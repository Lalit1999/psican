import {createContext, useState} from 'react' ;

const AppContext = createContext() ;

const AppContextProvider = ({children}) => {
	const [popOpen, setPopOpen] = useState(false) ;
	const [popContent, setPopContent] = useState('') ;

	const togglePop = () => {
		setPopOpen(!popOpen) ;
	}

	return (
		<AppContext.Provider value={ { popContent, popOpen, togglePop, setPopContent } }>
			{children}
		</AppContext.Provider>
	) ;
}

export {AppContext, AppContextProvider} ;