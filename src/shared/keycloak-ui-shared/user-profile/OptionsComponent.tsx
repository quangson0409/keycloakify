/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260200.0.0.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/user-profile/OptionsComponent.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    Radio
} from "@mui/material";
import { Controller } from "react-hook-form";
import { OptionLabel, Options, UserProfileFieldProps } from "./UserProfileFields";
import { UserProfileGroup } from "./UserProfileGroup";
import { fieldName, isRequiredAttribute, label } from "./utils";

export const OptionComponent = (props: UserProfileFieldProps) => {
    const { form, inputType, attribute, t } = props;
    const isRequired = isRequiredAttribute(attribute);
    const isMultiSelect = inputType.startsWith("multiselect");
    const options = (attribute.validators?.options as Options | undefined)?.options || [];

    const optionLabel = (attribute.annotations?.["inputOptionLabels"] as OptionLabel) || {};
    const prefix = attribute.annotations?.["inputOptionLabelsI18nPrefix"] as string;

    const fieldPath = fieldName(attribute.name);
    const fieldError = form.formState.errors[fieldPath];
    const hasError = Boolean(fieldError);
    const fieldDisplayName = label(t, attribute.displayName, attribute.name);

    const fetchLabel = (option: string) =>
        label(props.t, optionLabel[option], option, prefix);

    return (
        <UserProfileGroup {...props}>
            <Controller
                name={fieldPath}
                control={form.control}
                defaultValue={isMultiSelect ? [] : ""}
                render={({ field }) => (
                    <FormControl
                        component="fieldset"
                        error={hasError}
                        required={isRequired}
                        disabled={attribute.readOnly}
                    >
                        <FormLabel component="legend">
                            {fieldDisplayName}
                        </FormLabel>

                        {isMultiSelect ? (
                            <FormGroup>
                                {options.map(option => (
                                    <FormControlLabel
                                        key={option}
                                        control={
                                            <Checkbox
                                                checked={Array.isArray(field.value) ? field.value.includes(option) : false}
                                                onChange={(e) => {
                                                    const currentValue = Array.isArray(field.value) ? field.value : [];
                                                    if (e.target.checked) {
                                                        field.onChange([...currentValue, option]);
                                                    } else {
                                                        field.onChange(currentValue.filter((item: string) => item !== option));
                                                    }
                                                }}
                                                value={option}
                                            />
                                        }
                                        label={fetchLabel(option)}
                                    />
                                ))}
                            </FormGroup>
                        ) : (
                            <RadioGroup
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                {options.map(option => (
                                    <FormControlLabel
                                        key={option}
                                        value={option}
                                        control={<Radio />}
                                        label={fetchLabel(option)}
                                    />
                                ))}
                            </RadioGroup>
                        )}
                    </FormControl>
                )}
            />
        </UserProfileGroup>
    );
};
