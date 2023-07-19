import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  const noOfFFullStars = Math.floor(value);
  const noOfHalfStars = value - noOfFFullStars > 0 ? 1 : 0;
  const noOfEmptyStars = 5 - noOfFFullStars - noOfHalfStars;

  const stars = [];
  for (let i = 0; i < noOfFFullStars; i++) {
    stars.push(
      <span key={stars.length}>
        <FaStar />
      </span>
    );
  }
  if (noOfHalfStars) {
    stars.push(
      <span key={stars.length}>
        <FaStarHalfAlt />
      </span>
    );
  }
  for (let i = 0; i < noOfEmptyStars; i++) {
    stars.push(
      <span key={stars.length}>
        <FaRegStar />
      </span>
    );
  }

  return (
    <div className="rating">
      {stars}
      <span className="rating-text">{text}</span>
    </div>
  );
};

export default Rating;
