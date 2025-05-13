#!/bin/bash

# Function to create a todo
create_todo() {
    local title=$1
    curl -s -X POST -H "Content-Type: application/json" \
    -d "{\"query\": \"mutation { createTodo(input: { title: \\\"$title\\\" }) { _id title completed createdAt } }\"}" \
    http://localhost:3000/graphql | jq -r '.data.createTodo._id'
}

# Function to update a todo
update_todo() {
    local id=$1
    local completed=$2
    curl -s -X POST -H "Content-Type: application/json" \
    -d "{\"query\": \"mutation { updateTodo(id: \\\"$id\\\", input: { completed: $completed }) { _id title completed } }\"}" \
    http://localhost:3000/graphql
}

# Function to get all todos
get_todos() {
    curl -s -X POST -H "Content-Type: application/json" \
    -d '{"query": "query { todos { _id title completed createdAt } }"}' \
    http://localhost:3000/graphql
}

# Function to delete a todo
delete_todo() {
    local id=$1
    curl -s -X POST -H "Content-Type: application/json" \
    -d "{\"query\": \"mutation { deleteTodo(id: \\\"$id\\\") }\"}" \
    http://localhost:3000/graphql
}

echo "Starting CRUD operations..."

# Create 5 todos
echo "Creating todos..."
id1=$(create_todo "Complete project documentation")
sleep 1
id2=$(create_todo "Review pull requests")
sleep 1
id3=$(create_todo "Setup monitoring dashboard")
sleep 1
id4=$(create_todo "Update dependencies")
sleep 1
id5=$(create_todo "Write unit tests")
sleep 1

# Get all todos
echo "Getting all todos..."
get_todos
sleep 1

# Update todos
echo "Updating todos..."
update_todo "$id1" true
sleep 1
update_todo "$id2" true
sleep 1
update_todo "$id3" false
sleep 1
update_todo "$id4" true
sleep 1
update_todo "$id5" false
sleep 1

# Get all todos again
echo "Getting updated todos..."
get_todos
sleep 1

# Create 5 more todos
echo "Creating more todos..."
id6=$(create_todo "Deploy to production")
sleep 1
id7=$(create_todo "Fix security issues")
sleep 1
id8=$(create_todo "Optimize database queries")
sleep 1
id9=$(create_todo "Implement new features")
sleep 1
id10=$(create_todo "Update README")
sleep 1

# Update some todos again
echo "Updating more todos..."
update_todo "$id6" true
sleep 1
update_todo "$id7" false
sleep 1
update_todo "$id8" true
sleep 1

# Delete some todos
echo "Deleting todos..."
delete_todo "$id1"
sleep 1
delete_todo "$id3"
sleep 1
delete_todo "$id5"
sleep 1
delete_todo "$id7"
sleep 1
delete_todo "$id9"
sleep 1

# Final get all todos
echo "Getting final todo list..."
get_todos

echo "CRUD operations completed!"
