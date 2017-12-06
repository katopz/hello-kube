export PROJECT_ID=$(node -p "require('./package.json').config.project_id")
export VERSION=$(node -p "require('./package.json').version")

echo $PROJECT_ID
echo $VERSION

# Set defaults for the gcloud command-line tool
gcloud config set project $PROJECT_ID

# Set compute zone
gcloud config set compute/zone asia-southeast1-a

# Build the container image
docker build -t gcr.io/${PROJECT_ID}/hello-kube:$VERSION .

# Upload the container image
gcloud docker -- push gcr.io/${PROJECT_ID}/hello-kube:$VERSION