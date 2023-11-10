# Usa la imagen base de OpenJDK 17 proporcionada por Oracle
FROM openjdk:17-jdk-slim

# Copia el archivo JAR de la aplicación al directorio /usr/src/devops en la imagen
COPY promociones-0.0.1-SNAPSHOT.jar /usr/src/devops/promociones-0.0.1-SNAPSHOT.jar

# Establece el directorio de trabajo dentro de la imagen
WORKDIR /usr/src/devops

# Expone el puerto 8089 para que la aplicación pueda ser accesible desde fuera del contenedor
EXPOSE 8089

# Define el punto de entrada para la aplicación, ejecutando el archivo JAR con Java
ENTRYPOINT [ "java", "-jar", "/usr/src/devops/promociones-0.0.1-SNAPSHOT.jar" ]