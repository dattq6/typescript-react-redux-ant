declare namespace NSUser {
  interface Account {
    id: number;
    user_id: number;
    name: string;
    balance: number;
  }
  interface State extends BaseState {
    accounts?: DataSource<Account>;
    getUserAccountsStatus: ActionStatus;
  }
}
