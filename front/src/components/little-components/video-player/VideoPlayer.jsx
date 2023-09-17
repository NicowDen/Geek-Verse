import { useEffect, useState } from "react";
import mc from "./video-player.module.scss";
import ReactPlayer from "react-player/youtube";

const VideoPlayer = ({ videoUrl }) => {
  const [loaderWidth, setLoaderWidth] = useState(0);

  const moveLoader = () => {
    if (loaderWidth < 100)
      setTimeout(() => {
        setLoaderWidth(loaderWidth + 1);
      }, "2");
  };

  useEffect(() => {
    moveLoader();
  }, [loaderWidth]);

  return (
    <div className={mc.container}>
      {loaderWidth < 100 && (
        <div className={mc.loader_container}>
          <div
            style={{ minWidth: `${loaderWidth}%` }}
            className={mc.loader}
          ></div>
        </div>
      )}
      {loaderWidth >= 100 && (
        <div className={mc.player_wrapper}>
          <ReactPlayer
            url={videoUrl}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
