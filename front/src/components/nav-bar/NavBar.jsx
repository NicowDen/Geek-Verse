import mc from "./nav-bar.module.scss";
import NavBarCategories from "../nav-bar-categories/NavBarCategories";
import NavBarHeader from "../nav-bar-header/NavBarHeader";

const NavBar = ({ theme }) => {
  return (
    <nav className={mc.container}>
      <div className={mc.top}>
        <NavBarHeader theme={theme} />
      </div>
      <div className={mc.bottom}>
        <NavBarCategories />
      </div>
    </nav>
  );
};

export default NavBar;
