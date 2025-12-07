import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { serviceRequest } from "../services/httpClient";

const pretty = (value) => JSON.stringify(value, null, 2);

const tryParse = (value) => {
  if (!value) return undefined;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const ApiEndpointForm = ({ service, endpoint }) => {
  const { tokens } = useAuth();
  const [body, setBody] = useState(
    endpoint.bodyTemplate ? pretty(endpoint.bodyTemplate) : ""
  );
  const [pathParams, setPathParams] = useState(
    () =>
      endpoint.pathParams?.reduce(
        (acc, param) => ({ ...acc, [param]: "" }),
        {}
      ) ?? {}
  );
  const [queryParams, setQueryParams] = useState(
    () =>
      endpoint.queryParams?.reduce(
        (acc, param) => ({ ...acc, [param]: "" }),
        {}
      ) ?? {}
  );
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const resolvedPath = useMemo(() => {
    let currentPath = endpoint.path;
    Object.entries(pathParams).forEach(([key, value]) => {
      currentPath = currentPath.replace(`:${key}`, value || `:${key}`);
    });
    return currentPath;
  }, [endpoint.path, pathParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let payload;
      let formData;
      if (endpoint.multipart) {
        formData = new FormData();
        (endpoint.fileFields ?? []).forEach((field) => {
          const input = event.currentTarget.querySelector(
            `input[name="${field}"]`
          );
          const file = input?.files?.[0];
          if (file) {
            formData.append(field, file);
          }
        });
        const parsed = tryParse(body);
        if (parsed && typeof parsed === "object") {
          Object.entries(parsed).forEach(([key, value]) => {
            if (
              value !== undefined &&
              value !== null &&
              value !== "binary"
            ) {
              formData.append(key, value);
            }
          });
        }
      } else if (body) {
        payload = tryParse(body);
      }

      const response = await serviceRequest({
        service,
        path: resolvedPath,
        method: endpoint.method,
        token: endpoint.requiresAuth ? tokens[service] : undefined,
        body: payload,
        query: queryParams,
        formData,
      });
      setResult(response);
    } catch (err) {
      setError({
        status: err.status,
        data: err.data,
        message: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const missingToken = endpoint.requiresAuth && !tokens[service];

  return (
    <section className="api-endpoint">
      <header className="api-endpoint__header">
        <span className="api-endpoint__method">{endpoint.method}</span>
        <div>
          <strong>{endpoint.label}</strong>
          <p className="api-endpoint__path">{resolvedPath}</p>
        </div>
        {endpoint.requiresAuth && (
          <span className="api-endpoint__auth">Auth</span>
        )}
      </header>

      <form className="api-endpoint__form" onSubmit={handleSubmit}>
        {endpoint.description && (
          <p className="api-endpoint__description">{endpoint.description}</p>
        )}

        {endpoint.pathParams?.length ? (
          <div className="api-endpoint__grid">
            {endpoint.pathParams.map((param) => (
              <label key={param} className="api-endpoint__label">
                {param}
                <input
                  name={param}
                  value={pathParams[param]}
                  onChange={(event) =>
                    setPathParams((prev) => ({
                      ...prev,
                      [param]: event.target.value,
                    }))
                  }
                  placeholder={`:${param}`}
                />
              </label>
            ))}
          </div>
        ) : null}

        {endpoint.queryParams?.length ? (
          <div className="api-endpoint__grid">
            {endpoint.queryParams.map((param) => (
              <label key={param} className="api-endpoint__label">
                {param}
                <input
                  value={queryParams[param]}
                  onChange={(event) =>
                    setQueryParams((prev) => ({
                      ...prev,
                      [param]: event.target.value,
                    }))
                  }
                  placeholder={`Query: ${param}`}
                />
              </label>
            ))}
          </div>
        ) : null}

        {!["GET", "DELETE"].includes(endpoint.method) && (
          <label className="api-endpoint__label">
            JSON Body
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows={6}
              placeholder="{ }"
            />
          </label>
        )}

        {endpoint.multipart && (
          <>
            <p className="api-endpoint__note">
              This endpoint accepts multipart form-data. Upload binary payloads
              below and use the JSON area to send textual fields.
            </p>
            {endpoint.fileFields?.map((field) => (
              <label key={field} className="api-endpoint__label">
                {field}
                <input type="file" name={field} />
              </label>
            ))}
          </>
        )}

        <button type="submit" disabled={missingToken || isLoading}>
          {missingToken ? "Authenticate first" : isLoading ? "Sending..." : "Send"}
        </button>
      </form>

      <div className="api-endpoint__result">
        {error ? (
          <pre className="api-endpoint__error">
            {pretty(error)}
          </pre>
        ) : result ? (
          <pre>{pretty(result)}</pre>
        ) : (
          <span className="api-endpoint__placeholder">
            Response will show here
          </span>
        )}
      </div>
    </section>
  );
};

ApiEndpointForm.propTypes = {
  service: PropTypes.oneOf(["auth", "darna", "tirelire"]).isRequired,
  endpoint: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    requiresAuth: PropTypes.bool,
    description: PropTypes.string,
    pathParams: PropTypes.arrayOf(PropTypes.string),
    queryParams: PropTypes.arrayOf(PropTypes.string),
    bodyTemplate: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    multipart: PropTypes.bool,
  }).isRequired,
};

