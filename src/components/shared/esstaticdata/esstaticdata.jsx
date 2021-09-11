import React from 'react';
import { Row, Col } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl';

const EsStaticDataTitle = ({labelId, children}) => <h5 className='section__title border-bottom pb-2 mb-4 mt-4'>
  <FormattedMessage id={labelId} />
  <div style={{float: 'left'}}>
    {children}
  </div>
  </h5>

const EsStaticDataElement = ({labelId, value, gridWidth}) => (
  <Col md={gridWidth ? gridWidth : '4'}>
    <div className='mr-3 ml-3 mb-3'>
      <Row className='custom-label'>
        <FormattedMessage id={labelId} />
      </Row>
      <Row>
        {value}
      </Row>
    </div>
  </Col>
)

export {EsStaticDataTitle, EsStaticDataElement};
