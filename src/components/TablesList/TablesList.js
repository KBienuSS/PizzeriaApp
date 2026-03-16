import { Container, Col, Row} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';  
import { getAllTables } from '../../redux/tablesRedux';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const TablesList = () => {

    const tables = useSelector(getAllTables);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            if (tables !== undefined) {
                setLoading(false);
            }
        }, [tables]);

    if (loading) {
        return (
            <div className="mt-5 text-center">
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-2">Loading tables data...</p>
            </div>
        );
    }

    return(
        <Container>
            <Row className="align-items-start">
                        <Col className='p-0'>
                            <h1 className="display-4 mb-3 mt-2 mr-0">All Tables</h1>
                        </Col>
            </Row>
            {tables.map(table => (
            <Row key={table.id} xs={1} md={1} lg={1} xl={1} className="mt-2">
                    <Col className='p-0'>
                        <Card className="border-0 border-bottom rounded-0 w-100">
                            <Card.Body className="d-flex align-items-center">
                                <div className="d-flex align-items-center gap-4 flex-grow-1">
                                    <Card.Title className="mb-0" style={{ minWidth: '80px' }}>
                                    <h2>Table {table.id}</h2>
                                    </Card.Title>
                                    <Card.Subtitle className="text-muted mb-0" style={{ minWidth: '100px' }}>
                                    <b>Status:</b> {table.status}
                                    </Card.Subtitle>
                                </div>
                                <Button 
                                    variant="primary" 
                                    as={NavLink} 
                                    to={`/table/${table.id}`}
                                    className="ms-auto"
                                >
                                    Show more
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
            </Row>
            ))}
        </Container>
    )
}

export default TablesList