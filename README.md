# StarHub Todo Application

A production-ready todo list application built with NestJS and integrated with ELK Stack for logging visualization.

## Tech Stack

### Backend (Required)
- NestJS - Modern, progressive Node.js framework
- MongoDB - NoSQL database
- Docker - Container platform
- ELK Stack:
  - Elasticsearch - Search and analytics engine
  - Logstash - Log processing pipeline
  - Kibana - Visualization platform

## Project Structure
```
starhub/
├── backend/                 # NestJS application
│   ├── src/                # Source code
│   │   ├── todo/          # Todo module
│   │   └── main.ts        # Application entry point
│   ├── logs/              # Application logs
│   ├── Dockerfile         # Backend container configuration
│   └── package.json       # Dependencies and scripts
├── docker/
│   └── docker-compose.yml # Container orchestration
├── elk/                   # ELK Stack configuration
│   ├── elasticsearch/     # Elasticsearch configuration
│   ├── logstash/         # Logstash pipeline and config
│   └── kibana/           # Kibana dashboards
└── README.md
```

## Getting Started

### Prerequisites
- Docker and Docker Compose installed
- Node.js 20.x or later (for local development)

### Running with Docker

1. Clone the repository:
```bash
git clone https://github.com/moriisaac/ELK-TODO
cd starhub
```

2. Start the application stack:
```bash
cd docker
docker-compose up -d
```

This will start:
- NestJS backend on http://localhost:3000
- MongoDB on localhost:27017
- Elasticsearch on http://localhost:9200
- Kibana on http://localhost:5601
- Logstash for log processing

### API Endpoints

The following REST endpoints are available:

- `POST /todos` - Create a new todo
- `GET /todos` - List all todos
- `GET /todos/:id` - Get a specific todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

### Accessing Kibana Dashboard

1. Open Kibana at http://localhost:5601
2. Navigate to Management → Stack Management → Saved Objects
3. Import the dashboard configuration from `elk/kibana/kibana.ndjson`
4. Access the dashboard from the Dashboard menu

## Docker Services Explanation

### Backend Container
- **Purpose**: Runs the NestJS application
- **Benefits**: 
  - Consistent runtime environment
  - Easy deployment
  - Scalable architecture

### MongoDB Container
- **Purpose**: Persistent data storage
- **Benefits**:
  - Data persistence through Docker volumes
  - No local installation required
  - Isolated database environment

### ELK Stack Containers
- **Purpose**: Log aggregation and visualization
- **Benefits**:
  - Centralized logging
  - Real-time log processing
  - Visual insights through Kibana

## Features
- [x] CRUD operations for todo items using NestJS and MongoDB
- [x] Docker containerization with Docker Compose
- [x] JSON logging with Winston
- [x] ELK Stack integration (Elasticsearch, Logstash, Kibana)
- [x] Comprehensive Kibana dashboard for log visualization

## Architecture

### Docker Services and Containerization Strategy

The application uses Docker Compose to orchestrate the following services, each containerized for specific reasons:

1. **Backend (NestJS)**
   - **Why Containerized**: 
     - Ensures consistent Node.js runtime environment across development and production
     - Isolates application dependencies
     - Enables easy scaling and deployment
     - Simplifies CI/CD pipeline integration
   - Custom Node.js-based Dockerfile
   - Port: 3000

2. **MongoDB**
   - **Why Containerized**:
     - Provides data persistence without local installation
     - Ensures consistent database version
     - Easy backup and restore through Docker volumes
     - Simplifies development environment setup
   - Port: 27017

3. **Elasticsearch**
   - **Why Containerized**:
     - Complex configuration requirements
     - Resource-intensive service that benefits from isolation
     - Version consistency critical for ELK stack
     - Simplified cluster configuration for scaling
   - Port: 9200

4. **Logstash**
   - **Why Containerized**:
     - Requires specific configuration for log processing
     - Needs to be version-compatible with Elasticsearch
     - Pipeline configuration can be version controlled
     - Easy to modify log processing rules
   - Port: 5044

5. **Kibana**
   - **Why Containerized**:
     - Must match Elasticsearch version
     - Complex web application with specific dependencies
     - Configuration can be version controlled
     - Easy updates and rollbacks
   - Port: 5601

### Container Networking and Communication
- All services are connected through a Docker network
- Inter-service communication is secured and isolated
- Port mapping allows external access only to necessary services

## Monitoring and Logging

The application implements a comprehensive logging system:

1. **Log Generation**
   - JSON formatted logs
   - Stored in `backend/logs/`
   - Includes request context, operation type, and timestamps

2. **Log Processing**
   - Logstash processes logs in real-time
   - Custom pipeline for log enrichment
   - Direct forwarding to Elasticsearch

3. **Visualization**
   - Custom Kibana dashboard with:
     - System Overview (operation counts)
     - Log Level Distribution
     - Activity Timeline
     - Request Context Analysis

## Running the Application

1. **Clone the Repository**
```bash
git clone https://github.com/moriisaac/ELK-TODO.git
cd ELK-TODO
```

2. **Start with Docker Compose**
```bash
docker-compose up -d
```

3. **Access Services**
- API: http://localhost:3000
- Kibana: http://localhost:5601

4. **View Logs**
- Open Kibana (http://localhost:5601)
- Navigate to Menu → Dashboard
- Select "Todo Application Monitoring"

## Development

For local development without Docker:

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Start in Development Mode**
```bash
npm run start:dev
```

The application will be available at http://localhost:3000

## API Documentation

API endpoints are available at http://localhost:3000/api:

- `POST /todos` - Create a todo
- `GET /todos` - List all todos
- `GET /todos/:id` - Get a specific todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo
