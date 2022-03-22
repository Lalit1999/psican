import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';

const Text = ({data, onInputChange, value, error, type='text', disabled=false, plaintext=false}) => {
	const {name, label, id, descr} = data ;

	return (
		<Col md>
		    <FloatingLabel controlId={id} label={label}>
		    	<Form.Control type={type} value={value} name={name} onChange={onInputChange} placeholder={label} isInvalid={ !!error } disabled={disabled} plaintext={plaintext}/>
		    	<Form.Control.Feedback type='invalid'> { error } </Form.Control.Feedback>
		    </FloatingLabel>
		    {(descr)?<Form.Text> {descr} </Form.Text>:null}
		</Col>
	) ;
}

export default Text ;