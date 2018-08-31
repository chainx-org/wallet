import { RxApiInterface } from '@polkadot/api-rx/types';
import { Header } from '@polkadot/primitives/header';
import { Observable } from 'rxjs';
// import { defaultIfEmpty } from 'rxjs/operators';
// import ajax from 'rxjs/ajax'

export default class ApiObservable {
  private api: RxApiInterface;

  constructor(api: RxApiInterface) {
    this.api = api;
  }

  public chainNewHead = (): Observable<Header | undefined> => {
    return this.api.chain.newHead()
  };
}
