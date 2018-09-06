import React from 'react';

export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  style?: {
    [index: string]: any;
  };
}

export interface JssProps {
  classes: any;
}
