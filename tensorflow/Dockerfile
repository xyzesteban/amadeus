FROM tensorflow/tensorflow:latest

# Copy your model files into the container
COPY /src/model/amadeus.keras /model

# Copy the requirements file into the container
COPY requirements.txt /app/requirements.txt

# Set the working directory
WORKDIR /app

# Install any necessary dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port your Flask app will run on
EXPOSE 5000

# Command to run your application
CMD ["python", "/src/serve.py"]