import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import BodyMapList from '../BodyMapList';
import LoadingState from '../../shared/LoadingState';

function BodyMap(props) {
    const {
        disabled = false,
        bodyMapBasic, bodyMapTailor,
        onChangeBasic: handleBodyMapBasicChange,
        onChangeTailor: handleBodyMapTailorChange,
        onSave,
        onRefresh,
        errorMessage = 'An error occurred while updating the body map',
        loadingState = LoadingState.INITIAL,
    } = props;

    return (
        <Form onSubmit={onSave}>
            <BodyMapList
                disabled={disabled}
                title="Basic Body Map"
                bodyMap={bodyMapBasic}
                onChange={handleBodyMapBasicChange}
            />

            <BodyMapList
                disabled={disabled}
                title="Tailor Body Map"
                bodyMap={bodyMapTailor}
                onChange={handleBodyMapTailorChange}
            />

            {loadingState === LoadingState.IN_PROGRESS ? (
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Updating...
                </Button>
            ) : loadingState === LoadingState.SUCCESS ? (
                <Button variant="primary" disabled>
                    Updated
                </Button>
            ) : (
                <Button variant="primary" type="submit" disabled={disabled}>Update</Button>
            )}
            <Button className="ms-3" variant="secondary" onClick={onRefresh} disabled={disabled || [LoadingState.IN_PROGRESS, LoadingState.SUCCESS].includes(loadingState)}>Reset</Button>
            {loadingState === LoadingState.FAILED && (
                <Alert variant="danger" className="mt-3">
                    <Alert.Heading>Body map update failed</Alert.Heading>
                    <p>
                        {errorMessage}
                    </p>
                </Alert>
            )}
        </Form>
    );
}

export default BodyMap;