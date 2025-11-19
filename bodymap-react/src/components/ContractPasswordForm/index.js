import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import LoadingState from '../../shared/LoadingState';

function ContractPasswordForm(props) {
    const { disabled = false, loadingState, onChange: onContractPasswordChange, onSubmit: onContractPasswordSubmit, errorMessage = 'An error occurred while deploying the contract' } = props;

    return (
        <Form onSubmit={onContractPasswordSubmit}>
            <Form.Group className="mb-3" controlId="formContractPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" onChange={onContractPasswordChange} disabled={disabled} />
                <Form.Text className="text-muted">
                    We'll never share your password with anyone else.
                </Form.Text>
            </Form.Group>

            {loadingState === LoadingState.IN_PROGRESS ? (
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Deploying...
                </Button>
            ) : loadingState === LoadingState.SUCCESS ? (
                <Button variant="primary" disabled>
                    Deployed
                </Button>
            ) : (
                <Button variant="primary" type="submit" disabled={disabled}>
                    Deploy
                </Button>
            )}
            {loadingState === LoadingState.FAILED && (
                <Alert variant="danger" className="mt-3">
                    <Alert.Heading>Contract deployment failed</Alert.Heading>
                    <p>
                        {errorMessage}
                    </p>
                </Alert>
            )}
        </Form>
    );
}

export default ContractPasswordForm;