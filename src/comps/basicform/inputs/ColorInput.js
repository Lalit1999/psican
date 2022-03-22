import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const ColorInput = ({data, onInputChange, error}) => {
	const {name, label, id, descr} = data ;

	return (
		<Col md>
			<Form.Label htmlFor={id}>{label}</Form.Label>
		    <Form.Control type="color" id={id} defaultValue="#000000" name={name} onChange={onInputChange} isInvalid={ !!error } title={label} />
		    {(descr)?<Form.Text> {descr} </Form.Text>:null}
		</Col>
	) ;
}

export default ColorInput ;