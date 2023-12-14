// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { ButtonProps } from "../shared-components/ui/Button";

export type User = {
  id: number
  name: string
}

export interface Icon {
  type: string;
  onClick?: (...args: unknown[]) => unknown;
  link?: string;
}

export interface Route {
  id: number;
  link?: string;
  linkLabel: string;
  subNav?: Array<Route>;
  class?:string;
}

export interface HeaderConfig {
  headerStyle?: string;
  leftDiv?: { leftDivStyle?: string; icon: Icon };
  rightDiv?: { rightDivStyle: string; navbar?: any; icons?: Icon[]};
}


export interface PopupData {
  title: string;
  description: JSX.Element | string;
  content?: any;
  btnArray: ButtonProps[];
}

export interface InfoPopupData {
  title: string;
  description: JSX.Element | string;
  actions: ButtonProps[];
}