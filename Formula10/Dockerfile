FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /build/target/Formula10-0.0.1-SNAPSHOT.war app.war
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.war"]