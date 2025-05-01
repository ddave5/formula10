
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY target/Formula10-0.0.1-SNAPSHOT.war app.war
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.war"]