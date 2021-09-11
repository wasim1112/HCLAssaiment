import React from 'react';
import {withGlobalState} from '../../../AppGlobalState';
import { FormattedMessage } from 'react-intl';
import {RruForm, RruFormElement, getInitialValueForMultiCheckbox, getSubmitValueForMultiCheckbox} from '@coder966/react-rich-ui';


const EsForm = withGlobalState(RruForm);

const EsFormElement = withGlobalState(props => <RruFormElement
    {...props}
    label={props.labelId && <FormattedMessage id={props.labelId} />} 
/>);

export default EsForm;
export {EsFormElement, getInitialValueForMultiCheckbox, getSubmitValueForMultiCheckbox};
