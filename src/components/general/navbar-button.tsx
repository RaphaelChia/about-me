import { NAVBAR_ITEM } from "@/components/navbar";

interface NavbarButtonProps {
  navbarItem: NAVBAR_ITEM;
}

const NavbarButton = ({ navbarItem }: NavbarButtonProps) => {
  return <button>{navbarItem.label}</button>;
};

export default NavbarButton;
