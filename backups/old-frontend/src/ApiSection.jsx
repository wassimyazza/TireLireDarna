import PropTypes from "prop-types";
import { ApiEndpointForm } from "./ApiEndpointForm";

export const ApiSection = ({ title, description, service, endpoints }) => (
  <section className="api-section">
    <div className="api-section__header">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
    <div className="api-section__grid">
      {endpoints.map((endpoint) => (
        <ApiEndpointForm
          key={endpoint.key}
          service={service}
          endpoint={endpoint}
        />
      ))}
    </div>
  </section>
);

ApiSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  service: PropTypes.oneOf(["auth", "darna", "tirelire"]).isRequired,
  endpoints: PropTypes.arrayOf(PropTypes.object).isRequired,
};

