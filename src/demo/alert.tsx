import React, { SFC } from 'react';

export interface AlertProps {
   abc: string;
};

const Alert: SFC<AlertProps> = (props) => {
  return (<div>{props.children}</div>);
};

export {Alert};
