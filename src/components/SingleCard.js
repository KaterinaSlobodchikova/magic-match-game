import "./SingleCard.css";
import CoverImage from "../images/cover.png";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card-wrapper">
      <div className={flipped ? "flipped" : ""}>
        <img className="front-card" src={card.src} alt="front-card" />
        <img
          className="back-card"
          src={CoverImage}
          onClick={handleClick}
          alt="back-card"
        />
      </div>
    </div>
  );
};

export default SingleCard;
