import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getTableById, getAllTables,editTableRequest } from '../../redux/tablesRedux';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Table = () => {
    const { tableId } = useParams();
    const tables = useSelector(getAllTables);
    const table = useSelector(state => getTableById(state, tableId));
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [peopleAmount, setPeopleAmount] = useState(0);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState('');
    const [bill, setBill] = useState(0);
    const isDataLoaded = tables && tables.length > 0;
    const navigate = useNavigate();

    const handlesubmit = e => {
        e.preventDefault();
        dispatch(editTableRequest({status, peopleAmount, maxPeopleAmount, bill, tableId}));
        navigate('/');
    }

    useEffect(() => {
        if (isDataLoaded) {
            if (table) {
                setStatus(table.status || '');
                setPeopleAmount(table.peopleAmount?.toString() || 0);
                setMaxPeopleAmount(table.maxPeopleAmount?.toString() || '');
                setBill(table.bill?.toString() || 0);
            }
            setLoading(false);
        }
    }, [isDataLoaded, table]);

    if (loading || !isDataLoaded) {
        return (
            <div className="mt-5 text-center">
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-2">Loading table data...</p>
            </div>
        );
    }

    if(!table) return <Navigate to="/" /> 
    return(
        <div className='mt-4'>
            <h1 className="mb-4">Table {table.id}</h1>
            
            <Form onSubmit={handlesubmit}>
                <Form.Group className="mb-4" controlId="category">
                    <div className="d-flex align-items-center gap-2">
                        <Form.Label><strong>Status:</strong></Form.Label>
                        <Form.Select 
                            aria-label="Default select example" 
                            onChange={(e) => setStatus(e.target.value)} 
                            defaultValue={table.status}
                            className="w-auto"
                        >
                            <option key="Free">Free</option>
                            <option key="Busy">Busy</option>
                            <option key="Cleaning">Cleaning</option>
                            <option key="Reserved">Reserved</option>
                        </Form.Select>
                    </div>
                </Form.Group>

                <Form.Group className="mb-4" controlId="people">
                    
                    <div className="d-flex align-items-center gap-2">
                        <Form.Label><strong>People:</strong></Form.Label>
                        <Form.Control
                            min={0}
                            max={maxPeopleAmount}
                            type="number" 
                            value={(status === 'Busy' || status === 'Reserved') ? peopleAmount : 0} 
                            onChange={e => setPeopleAmount(e.target.value)}
                            style={{ width: '80px' }}
                        />
                        <span className="fs-5">/</span>
                        <Form.Control
                            min={0}
                            max={10}
                            type="number" 
                            value={maxPeopleAmount} 
                            onChange={e => {
                                setMaxPeopleAmount(e.target.value);
                                if (parseInt(peopleAmount) > parseInt(e.target.value)) {
                                    setPeopleAmount(e.target.value);
                                }
                            }}
                            style={{ width: '80px' }}
                        />
                    </div>
                </Form.Group>

                {status === 'Busy' && (
                    <Form.Group className="mb-4" controlId="bill">
                        <div className="d-flex align-items-center gap-2">
                            <Form.Label><strong>Bill:</strong></Form.Label>
                            <span className="fs-5">$</span>
                            <Form.Control
                                type="number" 
                                value={bill} 
                                onChange={e => setBill(e.target.value)}
                                style={{ width: '100px' }}
                            />
                        </div>
                    </Form.Group>
                )}

                <Button type="submit" variant="primary" size="lg">
                    Update
                </Button>
            </Form>
        </div>
    )
}

Table.propTypes = {
    status: PropTypes.string,
    peopleAmount: PropTypes.number,
    maxPeopleAmount: PropTypes.number,
    bill: PropTypes.number,
};

export default Table