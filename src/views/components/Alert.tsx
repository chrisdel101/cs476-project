import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { AlertTypes } from '../../../constants';

interface IProps {
  variant: AlertTypes;
  message?: string;
  duration?: number;
}

export const AppAlert = ({variant, message, show, setShow, duration}: IProps) => {

  useEffect(() => {
    if (show) {
      
      const timer = setTimeout(() => {
        setShow("");
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [show, setShow, duration]);

  if (show) {
      return (
      <Alert onClose={() => setShow("")} key={variant} variant={variant} show={message} dismissible>
        {message}
      </Alert>
      );
    }
}