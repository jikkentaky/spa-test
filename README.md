

# Docker Compose Setup and Run Instructions

1. **Prerequisites**
   - Docker and Docker Compose installed on your system
   - Project files in place

2. **Environment Setup**
   - Copy `.env.example` to `.env` in the root directory:
   ```bash
   cp env-example .env
   ```
   - Check `env-example` for required variables:
   ```env
   PORT=3000
   SOCKET_PORT=3001
   ```
   - Modify the values in your `.env` file if needed

3. **Build and Run**
   ```bash
   # Build and start containers in detached mode
   docker compose up -d --build

   # To see the logs
   docker compose logs -f

   # To stop the containers
   docker compose down
   ```

4. **Verification**
   - Check if the application is running:
     - Main application should be available at `http://localhost:3000` (or your configured PORT)
     - WebSocket server should be available on configured SOCKET_PORT

5. **Useful Commands**
   ```bash
   # View running containers
   docker compose ps

   # Restart services
   docker compose restart

   # Stop and remove containers, networks
   docker compose down

   # Stop and remove containers, networks, and volumes
   docker compose down -v
   ```

**Note:** Make sure the ports specified in your `.env` file are not being used by other applications on your system.
