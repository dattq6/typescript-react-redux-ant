const APIs = {
  methods: {
    grantCsrfToken: { verb: "GET", url: "grant-csrf-token", args: [] },
    getUserAccounts: { verb: "GET", url: "users/:id/accounts", args: [] },
  },
};
export type ApiMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
export type ApiName = keyof typeof APIs.methods;

export type ApiType = {
  methods: {
    [key in ApiName]: {
      verb: ApiMethod;
      url: string;
      args: Array<string>;
    };
  };
};

export default APIs as ApiType;
