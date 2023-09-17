//composant permettant de renvoyer un logo différent personnalisé dans la barre en header,
//en fonction du thème sélectionné

import logo from "../../../images/logoNeon.png";
import logoRedWhite from "../../../images/logoRedwhite.png";
import logoBlackGold from "../../../images/logoBlackGold.png";
import logoVintage from "../../../images/logoVintage.png";

const Logo = ({ theme }) => {
  const changeLogo = () => {
    if (theme === "redWhite") {
      return logoRedWhite;
    } else if (theme === "blackGold") {
      return logoBlackGold;
    } else if (theme === "vintage") {
      return logoVintage;
    } else {
      return logo;
    }
  };
  return (
    <>
      <img src={changeLogo()} alt="logo manette de jeu" />
    </>
  );
};

export default Logo;
