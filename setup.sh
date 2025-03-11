#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting up FullStackBlogApp...${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Create .env file from example if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${GREEN}Creating .env file from example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}Please update the .env file with your configuration.${NC}"
fi

# Create backend .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo -e "${GREEN}Creating backend .env file...${NC}"
    cp .env backend/.env
fi

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
echo -e "${GREEN}Installing backend dependencies...${NC}"
cd backend && npm install
echo -e "${GREEN}Installing frontend dependencies...${NC}"
cd ../frontend && npm install

# Return to root directory
cd ..

# Build and start containers
echo -e "${GREEN}Building and starting containers...${NC}"
docker-compose up -d --build

# Wait for services to be ready
echo -e "${GREEN}Waiting for services to be ready...${NC}"
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}Services are running successfully!${NC}"
    echo -e "${GREEN}Frontend: http://localhost:3001${NC}"
    echo -e "${GREEN}Backend: http://localhost:3000${NC}"
else
    echo -e "${YELLOW}Some services failed to start. Please check docker-compose logs for details.${NC}"
fi

echo -e "${GREEN}Setup complete!${NC}"
echo -e "${YELLOW}Don't forget to:${NC}"
echo -e "1. Update the .env file with your configuration"
echo -e "2. Run 'npm run test' in both backend and frontend directories to ensure everything is working"
echo -e "3. Check the README.md for more information"
