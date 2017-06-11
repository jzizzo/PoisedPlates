# Start with an image
FROM node:6.10.3-alpine

# Make a directory (-p: parents, will also create all directories leading up to the given directory that do not exist already. If the given directory already exists, ignore the error.)
RUN mkdir -p /code

# Set working directory for any subsequent RUN, CMD, ENTRYPOINT, COPY and ADD instruction in the Dockerfile
WORKDIR /code


# Copy the current directory contents into the container at /code
ADD . /code

ENV YARN_VERSION=0.24.6
ENV PATH="$PATH:/opt/yarn-0.24.6/bin"

# Install yarn
RUN rm -rf /usr/local/bin/yarn && apk add --no-cache git
ADD https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v${YARN_VERSION}.tar.gz /opt/yarn.tar.gz


# Install packages
