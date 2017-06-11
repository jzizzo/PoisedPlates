# Start with an image
FROM node:6.10.3-alpine

# Set yarn version to download
ENV YARN_VERSION=0.24.6

# Install yarn
RUN mkdir -p /opt
ADD https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v${YARN_VERSION}.tar.gz /opt/
RUN mv /opt/dist /opt/yarn
ENV PATH "$PATH:/opt/yarn/bin"

ADD package.json yarn.lock /tmp/

# Copy cache contents (if any) from local machine
ADD .yarn-cache.tgz /

# Install packages
RUN cd /tmp && yarn
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

RUN yarn global add knex

# Copy the code
ADD . /opt/app
