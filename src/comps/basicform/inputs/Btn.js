import Button from 'react-bootstrap/Button';

const Btn = ({data, userData, onClick}) => {
	const {name, style} = data ;

	return <Button className={style} onClick={() => onClick(userData)}>{name}</Button>
}

export default Btn ;