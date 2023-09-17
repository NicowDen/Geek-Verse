import mc from "./selection-card.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";

const SelectionCard = ({
  leftTabUp,
  rightTabUp,
  leftTabContent,
  rightTabContent,
  leftTabClick,
  rightTabClick,
  leftContent,
  rightContent,
}) => {
  const contentToReturn = () => {
    if (leftTabUp) {
      return leftContent;
    } else if (rightTabUp) {
      return rightContent;
    }
  };

  return (
    <div className={mc.container}>
      <div className={mc.tabs}>
        <button
          onClick={leftTabClick}
          className={leftTabUp ? `${mc.left_tab} ${mc.tab_up}` : mc.left_tab}
        >
          <span>{leftTabContent}</span>
        </button>

        <button
          onClick={rightTabClick}
          className={rightTabUp ? `${mc.right_tab} ${mc.tab_up}` : mc.right_tab}
        >
          <span>{rightTabContent}</span>
        </button>
      </div>
      <div className={mc.card}>{contentToReturn()}</div>
    </div>
  );
};

export default SelectionCard;
