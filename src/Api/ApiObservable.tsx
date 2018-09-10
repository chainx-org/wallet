import { RxApiInterface } from '@polkadot/api-rx/types';
import { Header } from '@polkadot/primitives/header';
import { Observable } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { Storages } from '@polkadot/storage/types';
import { SectionItem } from '@polkadot/params/types';
import storage from '@polkadot/storage';
import BN from 'bn.js';

export default class ApiObservable {
  private api: RxApiInterface;

  constructor(api: RxApiInterface) {
    this.api = api;
  }

  public chainNewHead = (): Observable<Header | undefined> => {
    return this.api.chain.newHead().pipe(defaultIfEmpty());
  };

  public systemChain = (): Observable<String | undefined> => {
    return this.api.system.chain();
  };

  public systemName = (): Observable<String | undefined> => {
    return this.api.system.name();
  };

  public systemVersion = (): Observable<String | undefined> => {
    return this.api.system.version();
  };

  public timestampBlockPeriod = (): Observable<BN | undefined> => {
    return this.rawStorage(storage.timestamp.public.blockPeriod);
  };

  public timestampNow = (): Observable<Date | undefined> => {
    return this.rawStorage(storage.timestamp.public.now);
  };

  public timestampDidUpdate = (): Observable<boolean | undefined> => {
    return this.rawStorage(storage.timestamp.public.didUpdate);
  };

  public rawStorage = <T extends any>(key: SectionItem<Storages>, ...params: Array<any>): Observable<T> => {
    return this.rawStorageMulti([key, ...params]).pipe(map(([result]: T[]): T => result));
  };

  public rawStorageMulti = <T extends any>(...keys: any[]): Observable<T> => {
    return this.api.state.storage(keys).pipe(map((result?: any) => (result === undefined ? [] : result)));
  };
}
