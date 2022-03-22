import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel' ;
import Col from 'react-bootstrap/Col';

const NumberInput = ({data, onInputChange, value, error}) => {
	const {name, label, id, descr} = data ;

	return (
		<Col md>
			<FloatingLabel controlId={id} label={label}>
		    	<Form.Control type="number" value={value} name={name} onChange={onInputChange} placeholder={label} isInvalid={ !!error } />
		    	<Form.Control.Feedback type='invalid'> { error } </Form.Control.Feedback>
		    	{(descr)?<Form.Text> {descr} </Form.Text>:null}
		    </FloatingLabel>
		</Col>
	) ;
}

export default NumberInput ; 