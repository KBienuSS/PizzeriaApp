import shortid from "shortid";
import { API_URL } from '../config'

export const getAllTables = (state => state.tables);
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);    

const createActionName = actionName => `app/tables/${actionName}`;
const ADD_TABLE = createActionName('ADD_TABLE');
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');

export const addTable = payload => ({ type: ADD_TABLE, payload });
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const fetchTables = () => {
    return (dispatch) => {
        fetch(`${API_URL}/tables`)
        .then(res => res.json())
        .then(tables => dispatch(updateTables(tables)))
    }
  };
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const editTableRequest = (data) => {
    return (dispatch) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.tableId,
                status: data.status,
                peopleAmount: data.peopleAmount,
                maxPeopleAmount: data.maxPeopleAmount,
                bill: data.bill
            }),
        };

        fetch(`${API_URL}/tables/${data.tableId}`, options)
        .then(() => dispatch(editTable(data)))
    }
}

const tablesReducer = (statePart = [], action) => {
    switch(action.type) {
        case ADD_TABLE:
            return [...statePart, { ...action.payload, id: shortid() }];
        case UPDATE_TABLES:
            return [...action.payload];
        case EDIT_TABLE:
            return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
        default:
            return statePart;
    }
}

export default tablesReducer;