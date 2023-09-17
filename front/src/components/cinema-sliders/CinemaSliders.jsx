//composant permettant de gérer les différents sliders en fonction d'une rubrique choisie
import mc from "./cinema-sliders.module.scss";
import { readOneCinemaThunk } from "../../api/cinema/readOneCinema.api";
import { useSelector, useDispatch } from "react-redux";
import { getCustomDate } from "../../utils/getDate.utils";
import { readAllCinemaThunk } from "../../api/cinema/readAllCinema.api";
import { useEffect } from "react";
/*====components====*/
import MySlider from "../little-components/slider/Slider";
import SlidersSearchBar from "../little-components/sliders-search-bar/SlidersSearchBar";
import SearchResultsGallery from "../little-components/search-results-gallery/SearchResultsGallery";
/*====components====*/

const CinemaSliders = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();

  const { cinema, searchBar, searchCinemaResult, cinemaSearchGalleryView } =
    useSelector((store) => {
      return {
        cinema: store.cinemaSlidersReducer.cinema,
        searchBar: store.cinemaSlidersReducer.searchBar,
        searchCinemaResult: store.cinemaSlidersReducer.searchCinemaResult,
        cinemaSearchGalleryView:
          store.modificatorsReducer.cinemaSearchGalleryView,
      };
    });

  const openSearchGallery = () => {
    dispatch({ type: "OPEN_CINEMA_SEARCH_GALLERY" });
  };

  const closeSearchGallery = () => {
    dispatch({ type: "CLOSE_CINEMA_SEARCH_GALLERY" });
  };

  const getOneFilm = (e) => {
    dispatch((dispatch, getState) =>
      readOneCinemaThunk(dispatch, getState, e.target.id)
    );
  };

  const updateField = (e) => {
    dispatch({
      type: "UPDATE_SEARCHBAR_FIELD",
      payload: { value: e.target.value },
    });
    if (e.target.value.length > 0) {
      dispatch({
        type: "SEARCH_CINEMA_RESULT",
        payload: {
          searchResult: cinema.filter(
            (el) =>
              el.title.match(e.target.value) ||
              el.actors.join(" ").match(e.target.value) ||
              el.type.join(" ").match(e.target.value) ||
              el.directors.join(" ").match(e.target.value)
          ),
        },
      });
      openSearchGallery();
    } else if (e.target.value.length <= 0) {
      dispatch({
        type: "SEARCH_CINEMA_RESULT",
        payload: {
          searchResult: [],
        },
      });
      closeSearchGallery();
    }
  };

  const labelUp = (e) => {
    dispatch({ type: "SEARCHBAR_LABEL_TOP" });
  };

  const labelDown = (e) => {
    if (e.target.value.length <= 0) dispatch({ type: "SEARCHBAR_LABEL_DOWN" });
  };

  useEffect(() => {
    dispatch(readAllCinemaThunk);
  }, []);

  const filterByTheme = (array, section, theme1, theme2) => {
    return array.filter((el) => {
      const filmDate = getCustomDate(
        el.release.year,
        el.release.month,
        el.release.day
      );
      return theme2
        ? (filmDate < currentDate && el[section].join(" ").match(theme1)) ||
            (filmDate < currentDate && el[section].join(" ").match(theme2))
        : filmDate < currentDate && el[section].join(" ").match(theme1);
    });
  };

  return (
    <div className={mc.container}>
      <div className={mc.search_bar}>
        <SlidersSearchBar
          labelModificator={searchBar.selected}
          labelContent="Rechercher"
          inputType="text"
          inputValue={searchBar.value}
          updateField={updateField}
          labelUp={labelUp}
          labelDown={labelDown}
        />
      </div>

      {cinemaSearchGalleryView ? (
        <div>
          <SearchResultsGallery
            onImageClick={getOneFilm}
            array={searchCinemaResult}
            searchValue={searchBar.value}
          />
        </div>
      ) : (
        cinema.length > 0 && (
          <div className={mc.sliders}>
            <MySlider
              onImageClick={getOneFilm}
              array={cinema.filter((el) => {
                const filmDate = getCustomDate(
                  el.release.year,
                  el.release.month,
                  el.release.day
                );
                return filmDate > currentDate;
              })}
              title={"A venir"}
            />
            <MySlider onImageClick={getOneFilm} array={cinema} title={"Tous"} />
            <MySlider
              onImageClick={getOneFilm}
              array={filterByTheme(cinema, "type", "science fiction")}
              title={"Science fiction"}
            />
            <MySlider
              onImageClick={getOneFilm}
              array={filterByTheme(cinema, "type", "horreur")}
              title={"Horreur"}
            />
            <MySlider
              onImageClick={getOneFilm}
              array={filterByTheme(cinema, "type", "drame")}
              title={"Drame"}
            />
            <MySlider
              onImageClick={getOneFilm}
              array={filterByTheme(cinema, "type", "action", "aventure")}
              title={"Action/Aventure"}
            />
            <MySlider
              onImageClick={getOneFilm}
              array={filterByTheme(cinema, "type", "thriller", "policier")}
              title={"Thrillers"}
            />
            <MySlider
              onImageClick={getOneFilm}
              array={filterByTheme(cinema, "type", "biopic")}
              title={"Biopics"}
            />
            <MySlider
              onImageClick={getOneFilm}
              array={filterByTheme(cinema, "type", "jeunesse")}
              title={"Jeunesse"}
            />
            <MySlider
              onImageClick={getOneFilm}
              array={filterByTheme(cinema, "type", "animation japonaise")}
              title={"Animation Japonaise"}
            />
            <MySlider
              onImageClick={getOneFilm}
              array={filterByTheme(cinema, "directors", "steven spielberg")}
              title={"Steven Spielberg"}
            />
            <MySlider
              onImageClick={getOneFilm}
              array={filterByTheme(cinema, "actors", "tom hanks")}
              title={"Tom Hanks"}
            />
          </div>
        )
      )}
    </div>
  );
};

export default CinemaSliders;
