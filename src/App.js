import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import TablesList from './components/TablesList/TablesList'
import Table from './components/Table/Table';
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { fetchTables } from './redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <main>
      <NavBar/>
      <Container>
        <Routes>
            <Route path="/" element={<TablesList />} />
            <Route path="/table/:tableId" element={<Table />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </Container>
    </main>
  )
}

export default App;
