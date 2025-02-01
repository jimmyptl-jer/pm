/**
 * Auth0ProviderWithNavigate Component
 *
 * This component is a wrapper for the Auth0Provider, which provides authentication
 * functionality throughout the React app. It handles the redirection logic after
 * login and ensures that all necessary Auth0 environment variables are passed correctly
 * to the Auth0Provider.
 *
 * The component also makes use of React Router's `useNavigate` hook to handle
 * redirection after the authentication process. When the user is redirected back to
 * the app after login, the `onRedirectCallback` function is triggered, and the user
 * is navigated to the appropriate route (either a custom route stored in `appState`
 * or a default '/auth-callback' route).
 *
 * Environment Variables:
 * - `VITE_AUTH0_DOMAIN`: The Auth0 domain for your tenant (default: "grwaywolf.us.auth0.com").
 * - `VITE_AUTH0_CLIENT_ID`: The Auth0 client ID (default: "3OyNZCc7GXrxt8Kp0dAs0HEeaa4sLxDP").
 * - `VITE_AUTH0_CALLBACK_URL`: The callback URL after authentication (default: "http://localhost:5173").
 * - `VITE_AUTH0_AUDIENCE`: The API audience for your application (default: "Food-Application").
 *
 * This component must be used at the root level of your application to ensure that
 * the Auth0 context is available throughout the entire app.
 *
 * Props:
 * - `children`: React.ReactNode, the children components to be rendered inside the Auth0Provider.
 *
 * Example Usage:
 * ```tsx
 * <Auth0ProviderWithNavigate>
 *   <App />
 * </Auth0ProviderWithNavigate>
 * ```
 * This ensures that all child components have access to the Auth0 context.
 */

import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  // Retrieve the necessary environment variables, falling back to defaults if not set
  const domain = import.meta.env.VITE_AUTH0_DOMAIN || "grwaywolf.us.auth0.com";
  const clientId =
    import.meta.env.VITE_AUTH0_CLIENT_ID || "3OyNZCc7GXrxt8Kp0dAs0HEeaa4sLxDP";
  const redirectUri =
    import.meta.env.VITE_AUTH0_CALLBACK_URL || "http://localhost:5173";
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE || "Food-Application";

  // Ensure all required environment variables are present
  if (!domain || !clientId || !redirectUri || !audience) {
    console.error("Environment variables are missing:", {
      domain,
      clientId,
      redirectUri,
      audience,
    });
    throw new Error(
      "Missing required Auth0 environment variables. Please check your configuration.",
    );
  }

  // This callback function is invoked after the user is redirected back to the app after login/logout
  const onRedirectCallback = (appState?: AppState) => {
    // Navigate to the URL stored in appState or fallback to the default '/auth-callback' route
    navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri, // Set the redirect URI after authentication
        audience: audience, // This is typically used for APIs
      }}
      onRedirectCallback={onRedirectCallback} // Handle redirect callback to proper route
    >
      {children}{" "}
      {/* This renders the children components within the Auth0 context */}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
