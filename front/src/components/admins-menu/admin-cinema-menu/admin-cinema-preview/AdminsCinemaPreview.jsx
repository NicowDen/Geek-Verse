import mc from "./admin-cinema-preview.module.scss";
import {
  firstLetterUpper,
  firstLettersUpper,
} from "../../../../utils/first-letter-upper.utils";
/*====components====*/
import ReactPlayer from "react-player";
/*====components====*/

const AdminsCinemaPreview = ({
  image,
  title,
  release,
  type,
  directors,
  actors,
  synopsis,
  trailer,
  deleteSpecificInArray,
}) => {
  return (
    <div className={mc.container}>
      <div className={mc.film}>
        <div className={mc.top}>
          <div className={`${mc.left} adaptive-img-contain`}>
            <span>
              <img src={image} />
            </span>
          </div>
          <div className={mc.right}>
            <div className={mc.title}>
              <h3>{title ? title.toUpperCase() : "TITLE"}</h3>
            </div>
            <table className={mc.table}>
              <tbody className={mc.tbody}>
                <tr className={mc.release_date}>
                  <th>Sortie</th>
                  <td>{release}</td>
                </tr>

                <tr className={mc.kind}>
                  <th>Genre</th>
                  <td>
                    {type?.map((el, j) => (
                      <div key={j}>
                        <button
                          onClick={(e) => deleteSpecificInArray(e, "type")}
                          id={el}
                          className={`delete ${mc.delete}`}
                        ></button>
                        <p>{firstLetterUpper(el)}</p>
                      </div>
                    ))}
                  </td>
                </tr>
                <tr className={mc.director}>
                  <th>De</th>
                  <td>
                    {directors?.map((el, j) => (
                      <div key={j}>
                        <button
                          onClick={(e) => deleteSpecificInArray(e, "directors")}
                          id={el}
                          className={`delete ${mc.delete}`}
                        ></button>
                        <p>{firstLettersUpper(el)}</p>
                      </div>
                    ))}
                  </td>
                </tr>

                <tr className={mc.actors}>
                  <th>Avec</th>
                  <td>
                    {actors?.map((el, j) => (
                      <div key={j}>
                        <button
                          onClick={(e) => deleteSpecificInArray(e, "actors")}
                          id={el}
                          className={`delete ${mc.delete}`}
                        ></button>
                        <p>{firstLettersUpper(el)}</p>
                      </div>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={mc.bottom}>
          <p>{synopsis ? firstLetterUpper(synopsis) : "Synopsis"}</p>
        </div>
      </div>

      <div className={mc.player_wrapper}>
        <div className={mc.player}>
          <ReactPlayer
            url={`https://www.youtube.com/embed/${trailer}/&origin=http://localhost:3000/`}
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  controls: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminsCinemaPreview;
