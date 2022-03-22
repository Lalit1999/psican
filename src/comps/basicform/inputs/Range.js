import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const Range = ({data, onInputChange, value = 0}) => {
	const {name, label, min, max, step, descr} = data ;

	return (
		<Col md>
			<Form.Label>{label}:&emsp;</Form.Label>
  			<Form.Range value={value} name={name} onChange={onInputChange} min={min} max={max} step={step} />
			<Form.Text> Current Rating : &emsp; {value} </Form.Text>
			{(descr)?<Form.Text> {descr} </Form.Text>:null}
		</Col>
	) ;
}

export default Range ;