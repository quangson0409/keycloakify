/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260200.0.0.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/user-profile/MultiInputComponent.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import {
    TextField,
    Button,
    Box,
    IconButton,
    InputAdornment
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { type TFunction } from "i18next";
import { Fragment, useEffect, useMemo } from "react";
import { FieldPath, UseFormReturn, useWatch } from "react-hook-form";

import { InputType, UserProfileFieldProps } from "./UserProfileFields";
import { UserProfileGroup } from "./UserProfileGroup";
import { UserFormFields, fieldName, labelAttribute } from "./utils";

export const MultiInputComponent = ({
    t,
    form,
    attribute,
    renderer,
    ...rest
}: UserProfileFieldProps) => (
    <UserProfileGroup t={t} form={form} attribute={attribute} renderer={renderer}>
        <MultiLineInput
            t={t}
            form={form}
            aria-label={labelAttribute(t, attribute)}
            name={fieldName(attribute.name)!}
            addButtonLabel={t("addMultivaluedLabel", {
                fieldLabel: labelAttribute(t, attribute)
            })}
            {...rest}
        />
    </UserProfileGroup>
);

export type MultiLineInputProps = Omit<any, "form"> & {
    t: TFunction;
    name: FieldPath<UserFormFields>;
    form: UseFormReturn<UserFormFields>;
    addButtonLabel?: string;
    isDisabled?: boolean;
    defaultValue?: string[];
    inputType: InputType;
};

const MultiLineInput = ({
    t,
    name,
    inputType,
    form,
    addButtonLabel,
    isDisabled = false,
    defaultValue,
    id,
    ...rest
}: MultiLineInputProps) => {
    const { register, setValue, control } = form;
    const value = useWatch({
        name,
        control,
        defaultValue: defaultValue || ""
    });

    const fields = useMemo<string[]>(() => {
        return Array.isArray(value) && value.length !== 0 ? value : defaultValue || [""];
    }, [value]);

    const remove = (index: number) => {
        update([...fields.slice(0, index), ...fields.slice(index + 1)]);
    };

    const append = () => {
        update([...fields, ""]);
    };

    const updateValue = (index: number, value: string) => {
        update([...fields.slice(0, index), value, ...fields.slice(index + 1)]);
    };

    const update = (values: string[]) => {
        const fieldValue = values.flatMap(field => field);
        setValue(name, fieldValue, {
            shouldDirty: true
        });
    };

    const type = inputType.startsWith("html")
        ? (inputType.substring("html".length + 2))
        : "text";

    useEffect(() => {
        register(name);
    }, [register]);

    return (
        <Box sx={{ width: '100%' }}>
            {fields.map((value, index) => (
                <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                        data-testid={name + index}
                        onChange={(e) => updateValue(index, e.target.value)}
                        name={`${name}.${index}.value`}
                        value={value}
                        disabled={isDisabled}
                        type={type}
                        variant="outlined"
                        fullWidth
                        size="medium"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        data-testid={"remove" + index}
                                        onClick={() => remove(index)}
                                        disabled={fields.length === 1 || isDisabled}
                                        size="small"
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        {...rest}
                    />
                </Box>
            ))}
            <Button
                variant="outlined"
                onClick={append}
                startIcon={<AddIcon />}
                disabled={!fields[fields.length - 1] || isDisabled}
                sx={{ mt: 1 }}
            >
                {addButtonLabel || "Add"}
            </Button>
        </Box>
    );
};
