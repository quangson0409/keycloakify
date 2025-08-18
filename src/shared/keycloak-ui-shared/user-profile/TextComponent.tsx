/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260200.0.0.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/user-profile/TextComponent.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

import { UserProfileFieldProps } from "./UserProfileFields";
import { UserProfileGroup } from "./UserProfileGroup";
import { fieldName, isRequiredAttribute, label } from "./utils";

export const TextComponent = (props: UserProfileFieldProps) => {
    const { form, inputType, attribute, t } = props;
    const isRequired = isRequiredAttribute(attribute);
    const [showPassword, setShowPassword] = useState(false);

    // Determine the input type
    let type = "text";
    if (inputType.startsWith("html5-")) {
        type = inputType.substring("html5-".length);
    }

    // Check if it's a password field
    const isPasswordField = attribute.name === "password" || attribute.name === "password-confirm";
    const actualType = isPasswordField ? (showPassword ? "text" : "password") : type;

    // const placeholder = attribute.readOnly
    //     ? ""
    //     : label(
    //         t,
    //         attribute.annotations?.["inputTypePlaceholder"] as string,
    //         "",
    //         attribute.annotations?.["inputOptionLabelsI18nPrefix"] as string
    //     );

    const fieldDisplayName = label(t, attribute.displayName, attribute.name);
    const helpText = attribute.annotations?.inputHelperTextBefore as string;

    // Get form validation state
    const fieldPath = fieldName(attribute.name);
    const fieldError = form.formState.errors[fieldPath];
    const hasError = Boolean(fieldError);

    return (
        <UserProfileGroup {...props}>
            <TextField
                id={attribute.name}
                name={fieldPath}
                label={fieldDisplayName}
                type={actualType}
                // placeholder={placeholder}
                variant="outlined"
                fullWidth
                required={isRequired}
                disabled={attribute.readOnly}
                error={hasError}
                helperText={hasError ? fieldError?.message : helpText}
                size="medium"
                {...form.register(fieldPath)}
                InputProps={isPasswordField ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : undefined}
            />
        </UserProfileGroup>
    );
};
