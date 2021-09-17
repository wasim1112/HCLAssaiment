import React, {useState, useEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import setLoadingState from '../../../utils/setLoadingState';
import {EsStaticDataTitle, EsStaticDataElement} from '../../shared/esstaticdata/esstaticdata';
import { Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import EsNavigationBreadcrumbs from '../../shared/EsNavigationBreadcrumbs/EsNavigationBreadcrumbs';
import EsPanel from '../../shared/EsPanel/EsPanel';
import Axios from 'axios';

const ViewBookComponent = ({location, history}) => {
  const [book, setBook] = useState(null);
  useEffect(() => {
    setLoadingState()
    const url = `https://613b3c71110e000017a45522.mockapi.io/api/v1/books/`+location.state
         Axios.get(url)
        .then(response => 
          {
            setBook(response.data)
          })
    .finally(() => setLoadingState(false));
  }, [])

  if(!book){
    return null;
  }

  return (
    <>
      <EsNavigationBreadcrumbs title='viewBook' intermediatePaths={[{
        link: '/booksManagement',
        labelId: 'booksManagement'
      }]} />
      <EsPanel actions={<Button variant='link' onClick={history.goBack}><FormattedMessage id='Back' /></Button>}>
        <EsStaticDataTitle labelId='Book Details' />
        <Row>
          <EsStaticDataElement labelId='Id' value={book.id} />
          <EsStaticDataElement labelId='Book Name' value={book.bookName} />
        </Row>
        <Row>
        <EsStaticDataElement labelId='Book Auther' value={book.bookAuther} />
          <EsStaticDataElement labelId='Book Auther' value={book.bookDesc} />
        </Row>
        <Row>
        <EsStaticDataElement labelId='Date issue' value={book.date} />
          <EsStaticDataElement labelId='Image Book' value={book.image} />
          <div   style={{margin: '12px'}}><div class="square"><img src={book.image} /></div></div>
        </Row>
        <Row>
        <EsStaticDataElement labelId='Number Of Page' value={book.numberOfPAge} />
        </Row>
      </EsPanel>

    </>
  );
};

export default withRouter(ViewBookComponent);
