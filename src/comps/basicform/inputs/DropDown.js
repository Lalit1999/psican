import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const DropDown = ({data, onInputChange, value, error}) => {
	const {name, label, options, descr} = data ;

	return (
		<Col md>
			<Form.Select value={value} name={name} onChange={onInputChange} aria-label={label} isInvalid={ !!error }>
				<option disabled>{label}</option>
				{options.map((one, i) => <option key={i} value={one}> {one}</option>)}
			</Form.Select>
	    	<Form.Control.Feedback type='invalid'> { error } </Form.Control.Feedback>
	    	{(descr)?<Form.Text> {descr} </Form.Text>:null}
		</Col>
	) ;
}

export default DropDown ;