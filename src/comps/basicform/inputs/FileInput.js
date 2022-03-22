import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const FileInput = ({data, onInputChange, error, multiple=false}) => {
	const {name, label, id, descr} = data ;
	
	return (
		<Col md>
			<Form.Group controlId={id} className="mb-3">
			    <Form.Label >{label}</Form.Label>
			    <Form.Control type="file" name={name} onChange={onInputChange} isInvalid={ !!error } multiple={multiple}/>
		    	<Form.Control.Feedback type='invalid'> { error } </Form.Control.Feedback>
			</Form.Group>
		    {(descr)?<Form.Text> {descr} </Form.Text>:null}
		</Col>
	) ;
}

export default FileInput ;