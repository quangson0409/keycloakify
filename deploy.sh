CONTAINER="my_keycloak"   


yarn install

yarn run build-keycloak-theme

docker cp "./node_modules/.cache/keycloakify/keycloak-theme-for-kc-all-other-versions.jar" "$CONTAINER:/opt/keycloak/providers/keycloak-theme.jar"

docker cp "./node_modules/keycloakify/src/bin/start-keycloak/keycloakify-logging-1.0.3.jar" "$CONTAINER:/opt/keycloak/providers/keycloakify-logging-1.0.3.jar"

docker cp "./dist_keycloak/theme/keycloakify-starter" "$CONTAINER:/opt/keycloak/themes/keycloakify-starter"
