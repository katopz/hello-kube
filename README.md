# hello-kube
Simple kubernetes example

## Install (macOS)
```shell
# Install homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Install Brew Caskroom
brew install caskroom/cask/brew-cask

# Install Kubernetes command-line tool
brew install kubectl

# Install Minikube
brew cask install minikube
```

## Start
```shell
# To start Kubernetes cluster
minikube start

# To run from image
kubectl run hello-minikube --image=gcr.io/google_containers/echoserver:1.4 --port=8080

# To list pod
kubectl get pod

# To expose service
kubectl expose deployment hello-minikube --type=NodePort
```

## Test
```shell
# To see it running and serve
curl $(minikube service hello-minikube --url)
```

## Stop
```shell
# Delete service
kubectl delete deployment hello-minikube

# Stop Kubernetes cluster
minikube stop
```

## Reusing the Docker daemon
> To use docker on the command line on your host mac/linux machine talking to the docker daemon inside the minikube VM:
```shell
# To eval
eval $(minikube docker-env)

# Then try some command
docker ps
```

## Build
```shell
# Build builder
npm run build-builder

# Build image (optional)
npm run build-image
```

## Create a container cluster
```shell
# Login
gcloud auth login

# Build and push to hub
npm run hub

# Create cluster
gcloud container clusters create hello-cluster --num-nodes=3

# List cluster
gcloud compute instances list
```

# Deploy
```shell
# Port
export PORT=3000

# Try local (optional)
docker run --rm -p 3000:3000 gcr.io/$PROJECT_ID/hello-app:$VERSION

# Run
kubectl run hello-kube --image=gcr.io/$PROJECT_ID/hello-kube:$VERSION --port $PORT

# See it run
kubectl get pods

# Expose your application to the Internet
kubectl expose deployment hello-kube --type=LoadBalancer --port 80 --target-port $PORT

# See it expose
kubectl get service
```

## Destroy
```shell
gcloud container clusters delete hello-kube

# Delete service
kubectl delete service hello-web
```

