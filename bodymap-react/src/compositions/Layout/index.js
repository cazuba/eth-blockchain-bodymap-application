import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Layout({ children }) {
  return (
    <Container className="bodymap-layout">
      <Row>
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;