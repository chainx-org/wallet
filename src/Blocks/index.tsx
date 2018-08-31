import { ApiProps } from '@polkadot/ui-react-rx/types';

import BN from 'bn.js';
import * as React from 'react';

import storage from '@polkadot/storage';
import withApi from '@polkadot/ui-react-rx/with/api';
import encodeAddress from '@polkadot/util-keyring/address/encode';

type StorageProposal = [BN, any, Uint8Array];
type StorageIntentions = Uint8Array[];
type StorageValidators = Uint8Array[];

interface StateBalances {
  [index: string]: BN;
}

interface StateProposals {
  [index: string]: number[];
}

interface State {
  balances: StateBalances;
  intentions: string[];
  proposals: StateProposals;
  subscriptions: any[];
  validators: string[];
}

const ZERO = new BN(0);

class Comp extends React.PureComponent<ApiProps, State> {
  constructor(props: ApiProps) {
    super(props);

    this.state = {
      balances: {},
      intentions: [],
      proposals: {},
      subscriptions: [],
      validators: [],
    };
  }

  componentDidMount() {
    this.setState({
      subscriptions: [this.subscribeIntentions(), this.subscribeProposals(), this.subscribeValidators()],
    });
  }

  subscribeIntentions() {
    const { api } = this.props;
    return api.state.getStorage(storage.staking.public.intentions).subscribe((storage: StorageIntentions) => {
      const intentions = storage.map(encodeAddress);

      this.setState({ intentions }, () => {
        this.subscribeBalances(intentions);
      });
    });
  }

  subscribeProposals() {
    const { api } = this.props;

    return api.state.getStorage(storage.democracy.public.proposals).subscribe((value: StorageProposal[]) => {
      this.setState({
        proposals: value.reduce(
          (proposals: StateProposals, [propIdx, proposal, accountId]) => {
            const address = encodeAddress(accountId);

            if (!proposals[address]) {
              proposals[address] = [propIdx.toNumber()];
            } else {
              proposals[address].push(propIdx.toNumber());
            }

            return proposals;
          },
          {} as StateProposals
        ),
      });
    });
  }

  subscribeValidators() {
    const { api } = this.props;

    return api.state.getStorage(storage.session.public.validators).subscribe((validators: StorageValidators) => {
      this.setState({
        validators: validators.map(encodeAddress),
      });
    });
  }

  subscribeBalances(accounts: string[]) {
    const { api } = this.props;
    const { balances, subscriptions } = this.state;
    const newBalances = { ...balances };

    accounts.forEach(account => {
      if (newBalances[account]) {
        return;
      } else {
        newBalances[account] = ZERO;
      }

      subscriptions.push(
        api.state
          // Here we pass a parameter to the key generator, so it points to the correct storage entry
          .getStorage(storage.staking.public.freeBalanceOf, account)
          .subscribe((balance: BN) => {
            this.setState(({ balances }: State) => {
              const newBalances = { ...balances };

              newBalances[account] = balance;

              return {
                balances: newBalances,
              };
            });
          })
      );
    });

    this.setState({
      balances: newBalances,
      subscriptions,
    });
  }

  componentWillUnmount() {
    const { subscriptions } = this.state;

    subscriptions.forEach(sub => sub.unsubscribe());
  }

  render() {
    const { balances, intentions, proposals, validators } = this.state;
    const sortedIntentions = intentions.sort((a, b) => (balances[b] || ZERO).cmp(balances[a] || ZERO));

    return (
      <table className="accounts">
        <thead>
          <tr>
            <th>Address</th>
            <th>Balance</th>
            <th>Proposals</th>
          </tr>
        </thead>
        <tbody>
          {sortedIntentions.map(address =>
            this.renderAccount(address, balances[address], proposals[address], validators.includes(address))
          )}
        </tbody>
      </table>
    );
  }

  renderAccount = (address: string, balance: BN = ZERO, proposals: number[] = [], isValidator: boolean = false) => {
    return (
      <tr className={isValidator ? 'validator' : ''} key={address}>
        <td>{address}</td>
        <td>{balance.toString(10)}</td>
        <td>{proposals.length}</td>
      </tr>
    );
  };
}

export default withApi(Comp);
