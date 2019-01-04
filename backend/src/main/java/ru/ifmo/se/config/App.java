package ru.ifmo.se.config;

import javax.annotation.sql.DataSourceDefinition;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@DataSourceDefinition(
        name = "java:app/PostgresDatasource",
        className = "org.postgresql.ds.PGConnectionPoolDataSource",
        databaseName = "studs",
        portNumber = 1234,
        user = "s243856",
        password = ""
)
@ApplicationPath("api")
public class App extends Application {
}
