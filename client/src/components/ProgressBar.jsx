import PropTypes from "prop-types";

const ProgressBar = ({ current, total }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all"
        style={{ width: `${((current + 1) / total) * 100}%` }}
      ></div>
      <p className="text-sm text-gray-600 mt-1 text-center">
        Question {current + 1} of {total}
      </p>
    </div>
  );
};


ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default ProgressBar;
