import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import LoadingState from '../../shared/LoadingState';

function BasicPasswordForm(props) {
    const { disabled = false, loadingState, errorMessage = 'An error occurred while saving the passwords', onChange: onBasicPasswordChange, onChangeTailor: onBasicPasswordChangeTailor, onSubmit } = props;

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Basic Password</Form.Label>
                <Form.Control name="basicPassword" type="text" placeholder="Basic Password" onChange={onBasicPasswordChange} disabled={disabled} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTailorPassword">
                <Form.Label>Tailor Password</Form.Label>
                <Form.Control name="tailorPassword" type="text" placeholder="Tailor Password" onChange={onBasicPasswordChangeTailor} disabled={disabled} />
            </Form.Group>

            {loadingState === LoadingState.SUCCESS ? (
                <Button variant="primary" disabled>
                    Saved
                </Button>
            ) : (
                <Button variant="primary" type="submit" disabled={disabled}>Save</Button>
            )}
            {loadingState === LoadingState.FAILED && (
                <Alert variant="danger" className="mt-3">
                    <Alert.Heading>Passwords setup failed</Alert.Heading>
                    <p>
                        {errorMessage}
                    </p>
                </Alert>
            )}
        </Form>
    );
}

export default BasicPasswordForm;