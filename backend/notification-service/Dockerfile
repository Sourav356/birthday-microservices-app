# Using official Node.js Alpine image
FROM node:24-alpine as builder

WORKDIR /app

# Copy only package files first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

#Runtime stage
FROM node:24-alpine AS runtime

WORKDIR /app

# Copy application files first
COPY . .

# Copy node_modules from builder AFTER code to ensure local node_modules doesn't overwrite it
COPY --from=builder /app/node_modules ./node_modules

# Apply group permissions for environments like OpenShift
RUN chgrp -R 0 /app && chmod -R g=u /app \
 && mkdir -p /home/.cache && chgrp -R 0 /home && chmod -R g=u /home

# Switch to a non-root user for security (built into the node image)
# We can also use a random UID like 'USER 1001'
USER node

EXPOSE 3003

# Run node directly instead of npm to ensure graceful process termination
CMD ["node", "index.js"]
