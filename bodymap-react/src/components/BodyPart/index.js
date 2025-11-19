import Form from 'react-bootstrap/Form';

function BodyPart(props) {
    const { name, value, onChange, disabled = false } = props;
    return (
        <Form.Group className="mb-3" controlId={name}>
            <Form.Label>{name}</Form.Label>
            <Form.Control name={name} type="text" placeholder={name} onChange={onChange} value={value} disabled={disabled} />
        </Form.Group>
    );
}

export default BodyPart;