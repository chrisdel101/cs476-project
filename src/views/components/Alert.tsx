import Alert from 'react-bootstrap/Alert';
import { AlertTypes } from '../../../constants';

interface IProps {
    variant: AlertTypes;
    message?: string;
}
// when msg is passed in, alert will show
export const AppAlert = ({variant, message}: IProps) => {
  return (
    <Alert key={variant} variant={variant} show={message ? true : false}>
      {message}
    </Alert>
  );
}

