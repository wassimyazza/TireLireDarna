import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../services/authApi";

export default function SsoCallback() {
  const [status, setStatus] = useState("Verifying SSO response…");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setToken, setProfile } = useAuth();
  const errorMessage = params.get("error");
  const token = params.get("token");
  const provider = params.get("provider");

  useEffect(() => {
    if (errorMessage || !token) {
      return;
    }
    let isMounted = true;
    const run = async () => {
      try {
        setToken("auth", token);
        const response = await authApi.profile(token);
        if (!isMounted) return;
        setProfile(response?.data?.user ?? response?.data ?? null);
        setStatus(`Connected via ${provider ?? "SSO"}. Redirecting…`);
        setTimeout(() => navigate("/dashboard"), 1500);
      } catch (error) {
        if (isMounted) {
          setStatus(`Unable to fetch profile: ${error.message}`);
        }
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [errorMessage, navigate, provider, setProfile, setToken, token]);

  return (
    <div className="page">
      <div className="sso-callback">
        <h1>Processing SSO</h1>
        <p>
          {errorMessage
            ? `SSO failed: ${errorMessage}`
            : token
              ? status
              : "Missing token in callback."}
        </p>
      </div>
    </div>
  );
}

