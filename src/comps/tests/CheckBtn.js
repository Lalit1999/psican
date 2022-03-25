import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faSquareCheck, faSquare} from '@fortawesome/free-solid-svg-icons' ;

const CheckBtn = ({styles, onClick, checked, text}) => {
	const icon = checked?faSquareCheck:faSquare ;

	return <Button className={styles} onClick={onClick}><FontAwesomeIcon icon={icon}/>&nbsp;{text}&nbsp;</Button>
} 

export default CheckBtn ;