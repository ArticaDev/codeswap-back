FROM denoland/deno:latest
WORKDIR /app
COPY ./deps.ts /app
RUN deno cache deps.ts
COPY . ./
ENV DB_USER $DB_USER
ENV DB_PASS $DB_PASS
ENV DB_HOST $DB_HOST
RUN deno cache main.ts
EXPOSE 8000
CMD deno run --allow-net --allow-read --allow-env main.ts