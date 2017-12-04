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
