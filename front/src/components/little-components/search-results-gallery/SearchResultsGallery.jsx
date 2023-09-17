//composant utilisé pour renvoyer les images en fonction de la recherche dans la rubrique sliders.
import mc from "./search-results-gallery.module.scss";

const SearchResultsGallery = ({ array, onImageClick, searchValue }) => {
  return (
    <div className={mc.container}>
      {array.length > 0 ? (
        <ul className={mc.gallery}>
          {array.map((el, i) => (
            <li id={array.id} key={i}>
              <div
                id={array.id}
                onClick={onImageClick}
                className={`${mc.image} adaptive-img-contain`}
              >
                <span>
                  <img
                    id={el.id}
                    crossOrigin="anonymous"
                    src={`http://localhost:7001/${el.image}`}
                    alt={`image de présentation du film ${el.title}`}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={mc.nothing_found}>
          <span>Aucun résultat trouvé pour votre recherche:</span>
          <span className={mc.search_input_text}>{searchValue}</span>
        </div>
      )}
    </div>
  );
};

export default SearchResultsGallery;
