/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260200.0.0.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/user-profile/TextAreaComponent.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { TextField } from "@mui/material";
import { UserProfileFieldProps } from "./UserProfileFields";
import { UserProfileGroup } from "./UserProfileGroup";
import { fieldName, isRequiredAttribute, label } from "./utils";

export const TextAreaComponent = (props: UserProfileFieldProps) => {
    const { form, attribute, t } = props;
    const isRequired = isRequiredAttribute(attribute);

    const fieldPath = fieldName(attribute.name);
    const fieldError = form.formState.errors[fieldPath];
    const hasError = Boolean(fieldError);

    const fieldDisplayName = label(t, attribute.displayName, attribute.name);
    const helpText = attribute.annotations?.inputHelperTextBefore as string;

    const rows = (attribute.annotations?.["inputTypeRows"] as number) || 4;
    const cols = attribute.annotations?.["inputTypeCols"] as number;

    return (
        <UserProfileGroup {...props}>
            <TextField
                id={attribute.name}
                name={fieldPath}
                label={fieldDisplayName}
                variant="outlined"
                fullWidth
                multiline
                rows={rows}
                required={isRequired}
                disabled={attribute.readOnly}
                error={hasError}
                helperText={hasError ? fieldError?.message : helpText}
                size="medium"
                {...form.register(fieldPath)}
                inputProps={{
                    ...(cols && { cols })
                }}
            />
        </UserProfileGroup>
    );
};
