import Button from 'react-bootstrap/Button' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons' ;

const SortBtn = ({text, click, icon}) => {
	const returnIcon = {
		asc : faSortUp,
		desc: faSortDown,
		' ' : faSort ,
	}

	return <Button variant="light" onClick={() => click(text)}>{text}<FontAwesomeIcon icon={returnIcon[icon]} /></Button> ;
}

export default SortBtn ;