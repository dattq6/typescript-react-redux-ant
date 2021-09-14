const getRandomKey = () => `${Math.floor(Math.random() * 100 + 1)}`;
export const menus = [
  {
    name: "Acounts Search",
    label: "Acounts Search",
    icon: "search",
    key: getRandomKey(),
    path: "/account-search",
  },
  {
    name: "Test Crash App",
    label: "Test Crash App",
    icon: "search",
    key: getRandomKey(),
    path: "/handle-exception",
  },
  {
    name: "Test Page Not Found",
    label: "Page Not Found",
    icon: "search",
    key: getRandomKey(),
    path: `/page-not-found`,
  },
];

export type MenuProps = typeof menus[number];
