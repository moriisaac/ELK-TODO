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
git clone <repository-url>
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
- [x] CRUD operations for todo items
- [x] Docker containerization
- [x] JSON logging
- [x] ELK Stack integration
- [x] Kibana dashboard for log visualization

## Monitoring and Logging

The application uses a comprehensive logging system:

1. Application logs are written in JSON format
2. Logs are stored in `backend/logs/`:
   - `combined.log` - All logs
   - `error.log` - Error-level logs only
3. Logstash processes these logs and forwards them to Elasticsearch
4. Kibana dashboard provides visualizations for:
   - Operation counts
   - Timeline of activities
   - Error tracking

## Development

For local development:

1. Install dependencies:
```bash
cd backend
npm install
```

2. Start in development mode:
```bash
npm run start:dev
```

The application will be available at http://localhost:3000
