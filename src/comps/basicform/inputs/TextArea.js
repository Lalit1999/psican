import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';

const TextArea = ({data, handleEnter, onInputChange, value, error}) => {
	const {name, label, id, descr} = data ;

	return(
		<Col md>
			<FloatingLabel controlId={id} label={label}>
			    <Form.Control as="textarea" value={value} name={name} onChange={onInputChange} onKeyPress={handleEnter} placeholder={label} style={{ height: '100px' }} isInvalid={ !!error }/>
		    	<Form.Control.Feedback type='invalid'> { error } </Form.Control.Feedback>
			</FloatingLabel>
		  	{(descr)?<Form.Text> {descr} </Form.Text>:null}
		</Col>
	) ;
}

 export default TextArea ;