import "./SingleCard.css";

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
          src="/images/cover.png"
          onClick={handleClick}
          alt="back-card"
        />
      </div>
    </div>
  );
};

export default SingleCard;
