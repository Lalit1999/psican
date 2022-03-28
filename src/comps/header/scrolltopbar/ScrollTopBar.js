import {useState, useEffect} from 'react' ;

import './scrolltopbar.css' ;

const ScrollTopBar = ({children, offset = 200 }) =>    {
  const [isAtTop, setIsAtTop] = useState(true) ;

  const hideBar = () => setIsAtTop( window.pageYOffset < offset ) 

  useEffect( () => {
    window.addEventListener('scroll', hideBar);

    return ( () => window.removeEventListener('scroll', hideBar) ) ;
    //eslint-disable-next-line
  }, []) ;

  if(!isAtTop)
    return <div className="scrolltopbar fade-in">{children}</div>;
  else return null ;

}

export default ScrollTopBar ;