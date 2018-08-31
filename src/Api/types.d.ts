import { RxApiInterface } from '@polkadot/api-rx/types';

import ApiObservable from './ApiObservable';

export interface IDefaultProps {}

export interface IApiConfig {
  url: string;
}

export interface IApiProps {
  api: RxApiInterface;
  apiConnected: boolean;
  apiObservable: ApiObservable;
}
