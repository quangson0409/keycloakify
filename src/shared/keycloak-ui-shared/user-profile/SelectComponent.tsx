/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260200.0.0.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/user-profile/SelectComponent.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Box,
    OutlinedInput,
    TextField
} from "@mui/material";
import { useState } from "react";
import { Controller, ControllerRenderProps } from "react-hook-form";
import { OptionLabel, Options, UserProfileFieldProps } from "./UserProfileFields";
import { UserProfileGroup } from "./UserProfileGroup";
import { UserFormFields, fieldName, label, isRequiredAttribute } from "./utils";

export const SelectComponent = (props: UserProfileFieldProps) => {
    const { t, form, inputType, attribute } = props;
    const isMultiValue = inputType === "multiselect";
    const isRequired = isRequiredAttribute(attribute);

    const options = (attribute.validators?.options as Options | undefined)?.options || [];
    const optionLabel = (attribute.annotations?.["inputOptionLabels"] as OptionLabel) || {};
    const prefix = attribute.annotations?.["inputOptionLabelsI18nPrefix"] as string;

    const fetchLabel = (option: string) =>
        label(props.t, optionLabel[option], option, prefix);

    const fieldPath = fieldName(attribute.name);
    const fieldError = form.formState.errors[fieldPath];
    const hasError = Boolean(fieldError);
    const fieldDisplayName = label(t, attribute.displayName, attribute.name);

    return (
        <UserProfileGroup {...props}>
            <Controller
                name={fieldPath}
                defaultValue={isMultiValue ? [] : ""}
                control={form.control}
                render={({ field }) => (
                    <FormControl fullWidth variant="outlined" error={hasError}>
                        <InputLabel id={`${attribute.name}-label`} required={isRequired}>
                            {fieldDisplayName}
                        </InputLabel>
                        <Select
                            labelId={`${attribute.name}-label`}
                            id={attribute.name}
                            multiple={isMultiValue}
                            value={field.value || (isMultiValue ? [] : "")}
                            onChange={field.onChange}
                            input={<OutlinedInput label={fieldDisplayName} />}
                            disabled={attribute.readOnly}
                            renderValue={isMultiValue ? (selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {(selected as string[]).map((value) => (
                                        <Chip
                                            key={value}
                                            label={fetchLabel(value)}
                                            size="small"
                                        />
                                    ))}
                                </Box>
                            ) : undefined}
                        >
                            {!isRequired && !isMultiValue && (
                                <MenuItem value="">
                                    <em>{t("selectOne")}</em>
                                </MenuItem>
                            )}
                            {options.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {fetchLabel(option)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />
        </UserProfileGroup>
    );
};
