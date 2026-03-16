import styles from './NavBar.module.scss';
import { NavLink } from 'react-router-dom';  
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import clsx from 'clsx';

const NavBar = () =>{

    return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Waiter.app</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <NavLink className={clsx(styles.link,({ isActive }) => isActive ? styles.linkActive : undefined)} to="/home">
                Home
            </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;