VERSION="v0.7.1"
echo $VERSION

docker build -t dependence_visual .

#docker run --rm -d -p 8300:80 dependence_visual:$VERSION