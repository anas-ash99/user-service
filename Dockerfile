# Step 1: Specify the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --production

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port that the app runs on
EXPOSE 5000

# Step 7: Define the command to run the app
CMD ["node", "src/app.js"]
