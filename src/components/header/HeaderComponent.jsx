import axios from 'axios'
import React from 'react'
import { Dropdown, Nav, Navbar } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { Link, withRouter } from 'react-router-dom'
import { withGlobalState } from '../../AppGlobalState'

const HeaderComponent = ({user, signOut, history, location}) => {
  const logout = () => {
    
      signOut();
      history.push('/');
  }
 
  return (
    <div>
      <header className="hcl__header">
        <div className='container center'>
          <div className="d-flex align-items-center" dir = 'rtl'>
            <div>
         
            </div>
            
              <Dropdown dir = 'rtl'>
                <Dropdown.Toggle variant='link' dir = 'rtl' style={{color: '#fff'}}>
                  <img className="" alt="" src="images/avatar-icon.svg" /> {user?.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={logout}><FormattedMessage id='logout' /></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            
          </div>
        </div>
      </header>
      <Navbar variant='dark'>
        <div className="container">
          <Nav activeKey={location.pathname}>
          {<Nav.Item><Nav.Link as={Link} to='/' href='/'><FormattedMessage id='home' /></Nav.Link></Nav.Item>}
            {<Nav.Item><Nav.Link as={Link} to='/booksManagement' href='/booksManagement'><FormattedMessage id='booksManagement' /></Nav.Link></Nav.Item>}
            
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}

export default withRouter(withGlobalState(HeaderComponent));
