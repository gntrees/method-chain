FROM oven/bun:latest

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libc6-dev bash \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
