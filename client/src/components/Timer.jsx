import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = ({ onTimeout, timeLimit }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout(); // Auto-submit when timer reaches 0
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeout]);

  return (
    <div className="text-lg font-semibold text-red-500 mt-4">
      Time Left: <span className="text-blue-600">{timeLeft}s</span>
    </div>
  );
};

Timer.propTypes = {
  onTimeout: PropTypes.func.isRequired,
  timeLimit: PropTypes.number,
};


Timer.defaultProps = {
  timeLimit: 15, // Default to 15 seconds if not provided
};

export default Timer;
