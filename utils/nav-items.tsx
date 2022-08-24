import { ReactElement } from "react";
import { Icons } from "./icons";

export type NavItemType = {
  name: string;
  route: string;
  icon: ReactElement;
};

export const navItems: NavItemType[] = [
  {
    name: "add a guardian",
    route: "add",
    icon: Icons.add,
  },
  {
    name: "lock a wallet",
    route: "lock",
    icon: Icons.lock,
  },
  {
    name: "unlock a wallet",
    route: "unlock",
    icon: Icons.unlock,
  },
  {
    name: "recover a wallet",
    route: "recover",
    icon: Icons.recover,
  },
  {
    name: "cancel wallet recovery",
    route: "cancel",
    icon: Icons.cancel,
  },
  {
    name: "approve a tansaction",
    route: "approve",
    icon: Icons.approve,
  },
];
