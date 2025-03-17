---
sidebar_position: 1
description: A guide for integration with the platform
---
# Integration
# Integrating with OpenCDMP

This documentation provides developers with guidelines on how to use the OAuth2 protocol offered by **Keycloak** to authenticate and integrate with the **OpenCDMP** platform. By following this guide, you will be able to securely access OpenCDMP's APIs and integrate your applications or services.

---

## Prerequisites

- **Access to OpenCDMP**: You should have access to an instance of the OpenCDMP platform.
- **Client Application**: An application or service that needs to integrate with OpenCDMP APIs.
- **Access to OpenCDMP Administrators**: You'll need to request client credentials from the OpenCDMP/Keycloak Admins.

---

## Steps to Integrate

### 1. Request OAuth2 Client Credentials

Contact the OpenCDMP/Keycloak administrators and request the following:

- **Client ID**: A unique identifier for your application.
- **Client Secret**: A secret key associated with your Client ID.

Provide the following information to the administrators:

- **Application Name**: The name of your application or service.
- **Required Scopes**: The application scopes that you want to request access for.
- **Redirect URIs** (if applicable): The URLs to which Keycloak will redirect after authentication (required for web applications using the Authorization Code flow).

### 2. Choose the Appropriate OAuth2 Flow

Depending on your application's type, select one of the OAuth2 flows:

- **Authorization Code Flow**: For web applications where users authenticate via a browser.
- **Client Credentials Flow**: For server-to-server communication without user interaction.

### 3. Configure Your Application

Use the obtained Client ID and Client Secret to configure your application:

- **OAuth2 Endpoints**:

  - **Authorization Endpoint**: `https://(KEYCLOAK_URL)/auth/realms/(REALM_NAME)/protocol/openid-connect/auth`
  - **Token Endpoint**: `https://(KEYCLOAK_URL)/auth/realms/(REALM_NAME)/protocol/openid-connect/token`
  - **User Info Endpoint**: `https://(KEYCLOAK_URL)/auth/realms/(REALM_NAME)/protocol/openid-connect/userinfo`

  Replace `(KEYCLOAK_URL)` with the Keycloak server URL and `(REALM_NAME)` with the realm name used by OpenCDMP.

- **Scopes**: Ensure that the necessary scopes are included in your requests, such as `openid`, `profile`, `email`, or any custom scopes provided by the administrators.

### 4. Implement the OAuth2 Flow

#### Authorization Code Flow (For Web Applications)

1. **Redirect User to Authorization Endpoint**:

   - Construct a URL to the Authorization Endpoint with the following query parameters:

     - `client_id`: Your Client ID.
     - `redirect_uri`: Your application's redirect URI.
     - `response_type`: `code`
     - `scope`: Requested scopes (e.g., `openid profile email`).

2. **Handle Authorization Response**:

   - After the user authenticates, Keycloak will redirect to your `redirect_uri` with a `code` parameter.

3. **Exchange Authorization Code for Access Token**:

   - Make a POST request to the Token Endpoint with:

     - `grant_type`: `authorization_code`
     - `code`: The authorization code received.
     - `redirect_uri`: Same as above.
     - `client_id` and `client_secret`: Your credentials.

4. **Store and Use the Access Token**:

   - Receive the access token and optional refresh token.
   - Use the access token to access OpenCDMP APIs.

#### Client Credentials Flow (For Server-to-Server Communication)

1. **Request Access Token**:

   - Make a POST request to the Token Endpoint with:

     - `grant_type`: `client_credentials`
     - `client_id` and `client_secret`: Your credentials.

2. **Use the Access Token**:

   - Receive the access token.
   - Use the token to authenticate API requests to OpenCDMP.

### 5. Access OpenCDMP APIs

With the access token, include it in the `Authorization` header of your HTTP requests:

```http
Authorization: Bearer {access_token}
```

    Replace `access_token` with the token obtained from Keycloak.

### 6. Refresh Tokens (If Applicable)

If your application receives a refresh token, you can use it to obtain new access tokens without re-authenticating:

    - Make a POST request to the Token Endpoint with:
        - `grant_type`: `refresh_token`
        - `refresh_token`: The refresh token received.
        - `client_id` and `client_secret`: Your credentials. 


## Additional Considerations

- **Token Validation**: It's recommended to validate tokens before use, either by decoding the JWT or using Keycloak's introspection endpoint.
- **SSL/TLS**: Ensure all communication with Keycloak and OpenCDMP APIs is over HTTPS to protect credentials and tokens.
- **Error Handling**: Implement proper error handling for authentication failures and token expiration.
- **Scope Management**: Request only the scopes necessary for your application to follow the principle of least privilege.
- **Logout**: If your application requires user logout functionality, redirect users to the Keycloak logout endpoint.
- **Refresh Tokens**: Be cautious with refresh tokens and store them securely to prevent unauthorized access.

---

## Sample Code Snippets

### Requesting an Access Token (Client Credentials Flow)

```bash
curl -X POST \
  'https://(KEYCLOAK_URL)/auth/realms/(REALM_NAME)/protocol/openid-connect/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials' \
  -d 'client_id=YOUR_CLIENT_ID' \
  -d 'client_secret=YOUR_CLIENT_SECRET'
```

### Accessing an OpenCDMP API Endpoint

```bash
curl -H "Authorization: Bearer {access_token}" \
  'https://(OPENCMP_API_URL)/api/endpoint'
```

---

## Contacting OpenCDMP/Keycloak Administrators

When reaching out to OpenCDMP/Keycloak administrators, provide the following information:

- **Your Name and Contact Information**
- **Purpose of Integration**: Brief description of your application's use case.
- **Required Access**: Specify the OpenCDMP resources your application needs to access.
- **Redirect URIs**: For web applications using the Authorization Code flow.
- **Desired Scopes**: Any specific scopes your application requires.

---

## Useful Links

- **Keycloak Documentation**: [https://www.keycloak.org/documentation](https://www.keycloak.org/documentation)
- **OAuth2 Specification**: [https://oauth.net/2/](https://oauth.net/2/)
- **OpenID Connect Specification**: [https://openid.net/connect/](https://openid.net/connect/)
<!-- - **OpenCDMP API Reference**: [https://opencdmp.org/api-docs](https://opencdmp.org/api-docs) -->

---

## Support

If you have any questions or need assistance with integration:

- **Email**: opencdmp at cite.gr
- **GitHub Issues**: [https://github.com/OpenCDMP/OpenCDMP/issues](https://github.com/OpenCDMP/OpenCDMP/issues)

---

**Note**: This guide assumes you have basic knowledge of OAuth2 and HTTP requests. Always ensure you follow best security practices when handling client credentials and access tokens.