import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;

const IconBtn = ({data, userData, onClick}) => {
	const {name, style, icon} = data ;

	return <Button className={style} onClick={() => onClick(userData)}><FontAwesomeIcon icon={icon} />{name}</Button>
}

export default IconBtn ;