import PropTypes from "prop-types";
import { authApi } from "../services/authApi";
import { APP_BASE_URL } from "../config/apiConfig";

export const SSOButton = ({ label = "Continue with Google" }) => {
  const state = btoa(`${APP_BASE_URL}/sso/callback`);
  const handleClick = () => {
    window.location.href = authApi.googleStartUrl(state);
  };

  return (
    <button type="button" className="sso-btn" onClick={handleClick}>
      {label}
    </button>
  );
};

SSOButton.propTypes = {
  label: PropTypes.string,
};

