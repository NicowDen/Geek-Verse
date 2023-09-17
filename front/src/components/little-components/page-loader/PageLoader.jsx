//composant en cours, permettant l'affichage d'un loader entre 2 chargements.
import mc from "./page-loader.module.scss";

const PageLoader = () => {
  return (
    <div className={mc.container}>
      <div className={mc.loader}></div>
    </div>
  );
};

export default PageLoader;
