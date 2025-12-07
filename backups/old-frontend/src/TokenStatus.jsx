import PropTypes from "prop-types";

export const TokenStatus = ({ label, token }) => (
  <div className="token-card">
    <h4>{label}</h4>
    <p className="token-card__status">
      {token ? "Connected" : "Not connected"}
    </p>
    {token && (
      <code className="token-card__hash">
        {`${token.slice(0, 12)}…${token.slice(-6)}`}
      </code>
    )}
  </div>
);

TokenStatus.propTypes = {
  label: PropTypes.string.isRequired,
  token: PropTypes.string,
};

