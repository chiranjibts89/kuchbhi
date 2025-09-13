#!/bin/bash

# Initialize git if not already done
git init

# Add remote repository
git remote add origin https://github.com/Gitodear/SIH-PrismWorlds-2025.git

# Verify remote
git remote -v

# Create and switch to main branch
git checkout -b main

# Add all files
git add .

# Initial commit
git commit -m "Initial commit"

# Push to remote
git push -u origin main
