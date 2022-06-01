import { Fragment} from 'react' ;

const returnEngHindi = (value, str) => {
	
	switch(str) {
		case 'p' :  return (
						<Fragment>
							<p>{value.english}</p>
							<p>{value.hindi}</p>
						</Fragment>
					) ;
		case 'li' : return (
						<Fragment>
							<li>{value.english}</li>
							<li>{value.hindi}</li>
						</Fragment>
					) ;
		default : 	return `${value.english} / ${value.hindi}` ;
	} 
}

export default returnEngHindi ;