Here’s a comprehensive documentation for your code:

---

# **Authentication Middleware**

This module provides middleware for validating JWT tokens and extracting user details for use in the application. It includes two key functionalities:

1. **`jwtCheck`**: Validates the JWT token using the `express-oauth2-jwt-bearer` library.
2. **`jwtParse`**: Decodes the JWT token, verifies the user against the database, and attaches user details to the request object.

---

### **Dependencies**
- `express-oauth2-jwt-bearer`: Handles JWT token validation with predefined options.
- `jsonwebtoken`: Used for decoding JWT tokens.
- `User`: The user model, used to check if a user exists in the database.

---

## **Global Declaration**

A global namespace `Express` is extended to add custom properties (`userId` and `auth0Id`) to the `Request` object. 

### **Code**
```typescript
declare global {
  namespace Express {
    interface Request {
      userId: string; // The database ID of the user
      auth0Id: string; // The Auth0 ID of the user
    }
  }
}
```

This ensures TypeScript recognizes the custom properties (`userId`, `auth0Id`) when they are added to `req`.

---

## **`jwtCheck` Middleware**

This middleware is used to validate the JWT token using `express-oauth2-jwt-bearer`.

### **Purpose**
- Ensures the token is signed with `RS256` and comes from the configured `issuerBaseURL`.
- Validates the token's audience matches the configured value.

### **Configuration**
- **`audience`**: The intended audience of the token (`AUTH0_AUDIENCE`).
- **`issuerBaseURL`**: The issuer URL of the token (`AUTH0_ISSUER_BASE_URL`).
- **`tokenSigningAlg`**: Specifies the signing algorithm (`RS256`).

### **Code**
```typescript
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256',
});
```

### **Usage**
This middleware should be used in routes to validate tokens before allowing access.

---

## **`jwtParse` Middleware**

### **Purpose**
This middleware performs the following:
1. **Validate the Authorization Header**: Ensures the token is present and formatted as `Bearer <token>`.
2. **Decode the Token**: Decodes the payload of the JWT to extract user details.
3. **Verify User Existence**: Checks the database for a user with the decoded `auth0Id`.
4. **Attach User Details**: Adds `auth0Id` and `userId` to the `Request` object for downstream use.

### **Code**
```typescript
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized: Missing or invalid token.' });
      return;
    }

    const token = authorization.split(' ')[1];
    const decoded = jwt.decode(token) as jwt.JwtPayload;

    if (!decoded || !decoded.sub) {
      res.status(401).json({ message: 'Unauthorized: Invalid token.' });
      return;
    }

    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id });
    if (!user) {
      res.status(401).json({ message: 'Unauthorized: User not found.' });
      return;
    }

    req.auth0Id = auth0Id;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.error('JWT Parse Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
```

---

### **Detailed Steps**

1. **Authorization Header Validation**:
   - The `Authorization` header is checked to ensure it starts with `Bearer`.
   - If invalid, a `401 Unauthorized` response is sent.

2. **Token Extraction**:
   - Extracts the token portion after `Bearer`.

3. **Token Decoding**:
   - Decodes the token using `jsonwebtoken` to extract the payload.

4. **Check User Existence**:
   - Queries the database using the `auth0Id` from the token payload.
   - If no user is found, a `401 Unauthorized` response is sent.

5. **Attach to Request**:
   - Adds `auth0Id` and `userId` to the `Request` object for use by subsequent middleware or route handlers.

6. **Error Handling**:
   - Catches errors during token decoding or database querying.
   - Logs the error and sends a `500 Internal Server Error` response.

---

### **Usage**

1. **Import Middleware**:
   ```typescript
   import { jwtCheck, jwtParse } from './middleware/auth';
   ```

2. **Apply in Routes**:
   ```typescript
   import express from 'express';
   const router = express.Router();

   router.get('/secure-route', jwtCheck, jwtParse, (req, res) => {
     res.json({ userId: req.userId, auth0Id: req.auth0Id });
   });

   export default router;
   ```

---

### **Example Scenarios**

1. **Token Missing**:
   - **Request**: No `Authorization` header or `Bearer` token.
   - **Response**: `401 Unauthorized: Missing or invalid token.`

2. **Invalid Token**:
   - **Request**: Malformed or invalid JWT token.
   - **Response**: `401 Unauthorized: Invalid token.`

3. **User Not Found**:
   - **Request**: Valid token, but no user in the database with the decoded `auth0Id`.
   - **Response**: `401 Unauthorized: User not found.`

4. **Successful Validation**:
   - **Request**: Valid token, and user exists in the database.
   - **Response**: The route handler proceeds with `req.userId` and `req.auth0Id`.

---

### **Advantages of This Approach**
- Centralized token validation ensures all routes are secure.
- Clear error handling provides meaningful feedback to clients.
- TypeScript definitions (`userId`, `auth0Id`) enhance type safety across the application.

This implementation is robust, scalable, and adheres to best practices for Express applications.



Here is your Kubernetes Deployment YAML with added comments to explain each section:

```yaml
apiVersion: apps/v1  # Specifies the API version for the Deployment resource
kind: Deployment  # Specifies the resource type being defined, which is a Deployment
metadata:
  name: food-application-api  # Name of the Deployment resource
  labels:  # Labels are used to identify the resource
    app: food-application-api  # This label will be used to identify and select the Deployment
spec:
  replicas: 3  # Number of replicas (pods) you want to run for this Deployment
  selector:
    matchLabels:  # This selector defines which pods are managed by this Deployment
      app: food-application-api  # Match the pods with the label app=food-application-api
  template:  # The pod template defines the specification for the pods
    metadata:
      labels:  # Labels for the pods created by the Deployment
        app: food-application-api  # Set the same label as the Deployment for proper association
    spec:
      containers:  # List of containers that should run in the pod
      - name: food-application-api  # Name of the container
        image: jerry4699/food-application-api  # Docker image to be used for the container
        ports:
        - containerPort: 7000  # The port inside the container that the application will use
```

### Explanation:
- **apiVersion**: Specifies the Kubernetes API version for the Deployment. Here, `apps/v1` is used for the Deployment API.
- **kind**: Defines the type of the resource, in this case, a `Deployment`.
- **metadata**: Contains metadata for the Deployment, such as the name and labels. The `app` label is used for selection.
- **spec**:
  - **replicas**: Specifies how many instances of the pod you want to run. Here, you want 3 replicas.
  - **selector**: Defines which pods should be managed by this Deployment based on labels.
  - **template**: Specifies the pod template. This is what Kubernetes uses to create pods. It includes:
    - **metadata**: The labels for the pod, which are the same as the Deployment for proper selection.
    - **spec**: Specifies the containers running in the pod. It includes the container name, image (`jerry4699/food-application-api`), and the container's exposed port (7000).

This YAML file sets up a Kubernetes Deployment for your `food-application-api` with 3 replicas and exposes port 7000.