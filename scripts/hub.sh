export PROJECT_NAME=$(node -p "require('./package.json').name")
export PROJECT_ID=$(node -p "require('./package.json').config.project_id")
export VERSION=$(node -p "require('./package.json').version")
export IMAGE=gcr.io/$PROJECT_ID/$PROJECT_NAME:$VERSION

echo $PROJECT_NAME
echo $PROJECT_ID
echo $VERSION
echo $IMAGE

# Set defaults for the gcloud command-line tool
gcloud config set project $PROJECT_ID

# Set compute zone
gcloud config set compute/zone asia-southeast1-a

# Build the container image
docker build -t $IMAGE .

# Upload the container image
gcloud docker -- push $IMAGE