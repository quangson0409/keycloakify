import { useEffect, Fragment } from "react";
import { assert } from "keycloakify/tools/assert";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import {
    TextField,
    FormControl,
    FormLabel,
    FormHelperText,
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
    FormGroup,
    Select,
    MenuItem,
    InputLabel,
    Box,
    Typography,
    IconButton,
    InputAdornment,
    Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    useUserProfileForm,
    getButtonToDisplayForMultivaluedAttributeField,
    type FormAction,
    type FormFieldError,
} from "keycloakify/login/lib/useUserProfileForm";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { Attribute } from "keycloakify/login/KcContext";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";

export default function UserProfileFormFields(props: UserProfileFormFieldsProps<KcContext, I18n>) {
    const {
        kcContext,
        i18n,
        kcClsx,
        onIsFormSubmittableValueChange,
        doMakeUserConfirmPassword,
        BeforeField,
        AfterField,
    } = props;

    const {
        formState: { formFieldStates, isFormSubmittable },
        dispatchFormAction,
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword,
    });

    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);

    const groupNameRef = { current: "" };

    return (
        <>
            {formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
                return (
                    <Fragment key={attribute.name}>
                        <GroupLabel
                            attribute={attribute}
                            groupNameRef={groupNameRef}
                            i18n={i18n}
                            kcClsx={kcClsx}
                        />
                        {BeforeField !== undefined && (
                            <BeforeField
                                attribute={attribute}
                                dispatchFormAction={dispatchFormAction}
                                displayableErrors={displayableErrors}
                                valueOrValues={valueOrValues}
                                kcClsx={kcClsx}
                                i18n={i18n}
                            />
                        )}
                        <Box
                            sx={{
                                display:
                                    attribute.annotations.inputType === "hidden" ||
                                        (attribute.name === "password-confirm" && !doMakeUserConfirmPassword)
                                        ? "none"
                                        : "block",
                                mb: 2,
                            }}
                        >
                            <InputFieldByType
                                attribute={attribute}
                                valueOrValues={valueOrValues}
                                displayableErrors={displayableErrors}
                                dispatchFormAction={dispatchFormAction}
                                kcClsx={kcClsx}
                                i18n={i18n}
                            />
                            <FieldErrors
                                attribute={attribute}
                                displayableErrors={displayableErrors}
                                kcClsx={kcClsx}
                                fieldIndex={undefined}
                            />
                            {AfterField !== undefined && (
                                <AfterField
                                    attribute={attribute}
                                    dispatchFormAction={dispatchFormAction}
                                    displayableErrors={displayableErrors}
                                    valueOrValues={valueOrValues}
                                    kcClsx={kcClsx}
                                    i18n={i18n}
                                />
                            )}
                        </Box>
                    </Fragment>
                );
            })}
        </>
    );
}

function GroupLabel(props: {
    attribute: Attribute;
    groupNameRef: {
        current: string;
    };
    i18n: I18n;
    kcClsx: KcClsx;
}) {
    const { attribute, groupNameRef, i18n } = props;

    const { advancedMsg } = i18n;

    if (attribute.group?.name !== groupNameRef.current) {
        groupNameRef.current = attribute.group?.name ?? "";

        if (groupNameRef.current !== "") {
            assert(attribute.group !== undefined);

            return (
                <Box
                    sx={{ mb: 3 }}
                    {...Object.fromEntries(
                        Object.entries(attribute.group.html5DataAnnotations).map(([key, value]) => [
                            `data-${key}`,
                            value,
                        ]),
                    )}
                >
                    {(() => {
                        const groupDisplayHeader = attribute.group.displayHeader ?? "";
                        const groupHeaderText =
                            groupDisplayHeader !== "" ? advancedMsg(groupDisplayHeader) : attribute.group.name;

                        return (
                            <Typography
                                variant="h6"
                                component="h3"
                                id={`header-${attribute.group.name}`}
                                sx={{ fontWeight: 600, mb: 1 }}
                            >
                                {groupHeaderText}
                            </Typography>
                        );
                    })()}
                    {(() => {
                        const groupDisplayDescription = attribute.group.displayDescription ?? "";

                        if (groupDisplayDescription !== "") {
                            const groupDescriptionText = advancedMsg(groupDisplayDescription);

                            return (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    id={`description-${attribute.group.name}`}
                                    sx={{ mb: 2 }}
                                >
                                    {groupDescriptionText}
                                </Typography>
                            );
                        }

                        return null;
                    })()}
                </Box>
            );
        }
    }

    return null;
}

function FieldErrors(props: {
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    fieldIndex: number | undefined;
    kcClsx: KcClsx;
}) {
    const { attribute, fieldIndex } = props;

    const displayableErrors = props.displayableErrors.filter(
        error => error.fieldIndex === fieldIndex,
    );

    if (displayableErrors.length === 0) {
        return null;
    }

    return (
        <FormHelperText
            id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`}
            error
            sx={{ mt: 0.5 }}
        >
            {displayableErrors
                .filter(error => error.fieldIndex === fieldIndex)
                .map(({ errorMessage }, i, arr) => (
                    <Fragment key={i}>
                        {errorMessage}
                        {arr.length - 1 !== i && <br />}
                    </Fragment>
                ))}
        </FormHelperText>
    );
}

type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    i18n: I18n;
    kcClsx: KcClsx;
};

function InputFieldByType(props: InputFieldByTypeProps) {
    const { attribute, valueOrValues } = props;

    switch (attribute.annotations.inputType) {
        // NOTE: Unfortunately, keycloak won't let you define input type="hidden" in the Admin Console.
        // sometimes in the future it might.
        case "hidden":
            return <input type="hidden" name={attribute.name} value={valueOrValues} />;
        case "textarea":
            return <TextareaTag {...props} />;
        case "select":
        case "multiselect":
            return <SelectTag {...props} />;
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return <InputTagSelects {...props} />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <>
                        {valueOrValues.map((...[, i]) => (
                            <InputTag key={i} {...props} fieldIndex={i} />
                        ))}
                    </>
                );
            }

            const inputNode = <InputTag {...props} fieldIndex={undefined} />;

            if (attribute.name === "password" || attribute.name === "password-confirm") {
                // For password fields, we need to modify the InputTag to include the password toggle
                return (
                    <PasswordInputField
                        {...props}
                        fieldIndex={undefined}
                    />
                );
            }

            return inputNode;
        }
    }
}

function PasswordInputField(props: InputFieldByTypeProps & { fieldIndex: number | undefined }) {
    const {
        attribute,
        fieldIndex,
        dispatchFormAction,
        valueOrValues,
        i18n,
        displayableErrors,
    } = props;

    const { advancedMsg, advancedMsgStr, msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId: attribute.name,
    });

    const hasError = displayableErrors.find(error => error.fieldIndex === fieldIndex) !== undefined;

    return (
        <>
            <TextField
                id={attribute.name}
                name={attribute.name}
                type={isPasswordRevealed ? "text" : "password"}
                label={advancedMsg(attribute.displayName ?? "")}
                required={attribute.required}
                fullWidth
                variant="outlined"
                size="medium"
                value={(() => {
                    if (fieldIndex !== undefined) {
                        assert(valueOrValues instanceof Array);
                        return valueOrValues[fieldIndex];
                    }

                    assert(typeof valueOrValues === "string");
                    return valueOrValues;
                })()}
                error={hasError}
                disabled={attribute.readOnly}
                placeholder={
                    attribute.annotations.inputTypePlaceholder === undefined
                        ? undefined
                        : advancedMsgStr(attribute.annotations.inputTypePlaceholder)
                }
                helperText={
                    attribute.annotations.inputHelperTextBefore !== undefined
                        ? advancedMsg(attribute.annotations.inputHelperTextBefore)
                        : attribute.annotations.inputHelperTextAfter !== undefined
                            ? advancedMsg(attribute.annotations.inputHelperTextAfter)
                            : undefined
                }
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                                onClick={toggleIsPasswordRevealed}
                                edge="end"
                                size="small"
                            >
                                {isPasswordRevealed ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                inputProps={{
                    autoComplete: attribute.autocomplete,
                    pattern: attribute.annotations.inputTypePattern,
                    maxLength:
                        attribute.annotations.inputTypeMaxlength === undefined
                            ? undefined
                            : parseInt(`${attribute.annotations.inputTypeMaxlength}`),
                    minLength:
                        attribute.annotations.inputTypeMinlength === undefined
                            ? undefined
                            : parseInt(`${attribute.annotations.inputTypeMinlength}`),
                    max: attribute.annotations.inputTypeMax,
                    min: attribute.annotations.inputTypeMin,
                    step: attribute.annotations.inputTypeStep,
                    ...Object.fromEntries(
                        Object.entries(attribute.html5DataAnnotations ?? {}).map(([key, value]) => [
                            `data-${key}`,
                            value,
                        ]),
                    ),
                }}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            if (fieldIndex !== undefined) {
                                assert(valueOrValues instanceof Array);

                                return valueOrValues.map((value, i) => {
                                    if (i === fieldIndex) {
                                        return event.target.value;
                                    }

                                    return value;
                                });
                            }

                            return event.target.value;
                        })(),
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: fieldIndex,
                    })
                }
                sx={{ mb: 1 }}
            />
            {(() => {
                if (fieldIndex === undefined) {
                    return null;
                }

                assert(valueOrValues instanceof Array);

                const values = valueOrValues;

                return (
                    <>
                        <FieldErrors
                            attribute={attribute}
                            kcClsx={props.kcClsx}
                            displayableErrors={displayableErrors}
                            fieldIndex={fieldIndex}
                        />
                        <AddRemoveButtonsMultiValuedAttribute
                            attribute={attribute}
                            values={values}
                            fieldIndex={fieldIndex}
                            dispatchFormAction={dispatchFormAction}
                            i18n={i18n}
                        />
                    </>
                );
            })()}
        </>
    );
}

function InputTag(props: InputFieldByTypeProps & { fieldIndex: number | undefined }) {
    const {
        attribute,
        fieldIndex,
        dispatchFormAction,
        valueOrValues,
        i18n,
        displayableErrors,
    } = props;

    const { advancedMsg, advancedMsgStr } = i18n;

    const hasError = displayableErrors.find(error => error.fieldIndex === fieldIndex) !== undefined;

    const inputType = (() => {
        const { inputType } = attribute.annotations;

        if (inputType?.startsWith("html5-")) {
            return inputType.slice(6);
        }

        return inputType ?? "text";
    })();

    const isPasswordField = attribute.name === "password" || attribute.name === "password-confirm";

    return (
        <>
            <TextField
                id={attribute.name}
                name={attribute.name}
                type={isPasswordField ? "password" : inputType}
                label={advancedMsg(attribute.displayName ?? "")}
                required={attribute.required}
                fullWidth
                variant="outlined"
                size="medium"
                value={(() => {
                    if (fieldIndex !== undefined) {
                        assert(valueOrValues instanceof Array);
                        return valueOrValues[fieldIndex];
                    }

                    assert(typeof valueOrValues === "string");
                    return valueOrValues;
                })()}
                error={hasError}
                disabled={attribute.readOnly}
                placeholder={
                    attribute.annotations.inputTypePlaceholder === undefined
                        ? undefined
                        : advancedMsgStr(attribute.annotations.inputTypePlaceholder)
                }
                helperText={
                    attribute.annotations.inputHelperTextBefore !== undefined
                        ? advancedMsg(attribute.annotations.inputHelperTextBefore)
                        : attribute.annotations.inputHelperTextAfter !== undefined
                            ? advancedMsg(attribute.annotations.inputHelperTextAfter)
                            : undefined
                }
                inputProps={{
                    autoComplete: attribute.autocomplete,
                    pattern: attribute.annotations.inputTypePattern,
                    maxLength:
                        attribute.annotations.inputTypeMaxlength === undefined
                            ? undefined
                            : parseInt(`${attribute.annotations.inputTypeMaxlength}`),
                    minLength:
                        attribute.annotations.inputTypeMinlength === undefined
                            ? undefined
                            : parseInt(`${attribute.annotations.inputTypeMinlength}`),
                    max: attribute.annotations.inputTypeMax,
                    min: attribute.annotations.inputTypeMin,
                    step: attribute.annotations.inputTypeStep,
                    ...Object.fromEntries(
                        Object.entries(attribute.html5DataAnnotations ?? {}).map(([key, value]) => [
                            `data-${key}`,
                            value,
                        ]),
                    ),
                }}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            if (fieldIndex !== undefined) {
                                assert(valueOrValues instanceof Array);

                                return valueOrValues.map((value, i) => {
                                    if (i === fieldIndex) {
                                        return event.target.value;
                                    }

                                    return value;
                                });
                            }

                            return event.target.value;
                        })(),
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: fieldIndex,
                    })
                }
                sx={{ mb: 1 }}
            />
            {(() => {
                if (fieldIndex === undefined) {
                    return null;
                }

                assert(valueOrValues instanceof Array);

                const values = valueOrValues;

                return (
                    <>
                        <FieldErrors
                            attribute={attribute}
                            kcClsx={props.kcClsx}
                            displayableErrors={displayableErrors}
                            fieldIndex={fieldIndex}
                        />
                        <AddRemoveButtonsMultiValuedAttribute
                            attribute={attribute}
                            values={values}
                            fieldIndex={fieldIndex}
                            dispatchFormAction={dispatchFormAction}
                            i18n={i18n}
                        />
                    </>
                );
            })()}
        </>
    );
}

function AddRemoveButtonsMultiValuedAttribute(props: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
    dispatchFormAction: React.Dispatch<Extract<FormAction, { action: "update" }>>;
    i18n: I18n;
}) {
    const { attribute, values, fieldIndex, dispatchFormAction, i18n } = props;

    const { msg } = i18n;

    const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({
        attribute,
        values,
        fieldIndex,
    });

    const idPostfix = `-${attribute.name}-${fieldIndex + 1}`;

    return (
        <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
            {hasRemove && (
                <Button
                    id={`kc-remove${idPostfix}`}
                    type="button"
                    variant="text"
                    color="error"
                    size="small"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: values.filter((_, i) => i !== fieldIndex),
                        })
                    }
                >
                    {msg("remove")}
                </Button>
            )}
            {hasAdd && (
                <Button
                    id={`kc-add${idPostfix}`}
                    type="button"
                    variant="text"
                    color="primary"
                    size="small"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: [...values, ""],
                        })
                    }
                >
                    {msg("addValue")}
                </Button>
            )}
        </Box>
    );
}

function InputTagSelects(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, i18n, valueOrValues } = props;

    const { advancedMsg } = i18n;

    const { inputType } = attribute.annotations;

    assert(inputType === "select-radiobuttons" || inputType === "multiselect-checkboxes");

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;

            if (inputOptionsFromValidation === undefined) {
                break walk;
            }

            const validator = (attribute.validators as Record<string, { options?: string[] }>)[
                inputOptionsFromValidation
            ];

            if (validator === undefined) {
                break walk;
            }

            if (validator.options === undefined) {
                break walk;
            }

            return validator.options;
        }

        return attribute.validators.options?.options ?? [];
    })();

    const hasError = props.displayableErrors.length !== 0;

    if (inputType === "select-radiobuttons") {
        return (
            <FormControl component="fieldset" error={hasError} disabled={attribute.readOnly} fullWidth>
                <FormLabel component="legend" required={attribute.required}>
                    {advancedMsg(attribute.displayName ?? "")}
                </FormLabel>
                <RadioGroup
                    name={attribute.name}
                    value={typeof valueOrValues === "string" ? valueOrValues : ""}
                    onChange={event =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: event.target.value,
                        })
                    }
                    onBlur={() =>
                        dispatchFormAction({
                            action: "focus lost",
                            name: attribute.name,
                            fieldIndex: undefined,
                        })
                    }
                >
                    {options.map(option => (
                        <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio />}
                            label={inputLabel(i18n, attribute, option)}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        );
    }

    // multiselect-checkboxes
    return (
        <FormControl component="fieldset" error={hasError} disabled={attribute.readOnly} fullWidth>
            <FormLabel component="legend" required={attribute.required}>
                {advancedMsg(attribute.displayName ?? "")}
            </FormLabel>
            <FormGroup>
                {options.map(option => (
                    <FormControlLabel
                        key={option}
                        control={
                            <Checkbox
                                name={attribute.name}
                                value={option}
                                checked={
                                    valueOrValues instanceof Array
                                        ? valueOrValues.includes(option)
                                        : valueOrValues === option
                                }
                                onChange={event =>
                                    dispatchFormAction({
                                        action: "update",
                                        name: attribute.name,
                                        valueOrValues: (() => {
                                            const isChecked = event.target.checked;

                                            if (valueOrValues instanceof Array) {
                                                const newValues = [...valueOrValues];

                                                if (isChecked) {
                                                    newValues.push(option);
                                                } else {
                                                    newValues.splice(newValues.indexOf(option), 1);
                                                }

                                                return newValues;
                                            }

                                            return event.target.checked ? option : "";
                                        })(),
                                    })
                                }
                                onBlur={() =>
                                    dispatchFormAction({
                                        action: "focus lost",
                                        name: attribute.name,
                                        fieldIndex: undefined,
                                    })
                                }
                            />
                        }
                        label={inputLabel(i18n, attribute, option)}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
}

function TextareaTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, displayableErrors, valueOrValues, i18n } = props;

    const { advancedMsg } = i18n;

    assert(typeof valueOrValues === "string");

    const value = valueOrValues;
    const hasError = displayableErrors.length !== 0;

    return (
        <TextField
            id={attribute.name}
            name={attribute.name}
            label={advancedMsg(attribute.displayName ?? "")}
            required={attribute.required}
            fullWidth
            multiline
            variant="outlined"
            size="medium"
            value={value}
            error={hasError}
            disabled={attribute.readOnly}
            rows={
                attribute.annotations.inputTypeRows === undefined
                    ? 4
                    : parseInt(`${attribute.annotations.inputTypeRows}`)
            }
            inputProps={{
                maxLength:
                    attribute.annotations.inputTypeMaxlength === undefined
                        ? undefined
                        : parseInt(`${attribute.annotations.inputTypeMaxlength}`),
            }}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: event.target.value,
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined,
                })
            }
            sx={{ mb: 1 }}
        />
    );
}

function SelectTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, displayableErrors, i18n, valueOrValues } = props;

    const { advancedMsg } = i18n;

    const isMultiple = attribute.annotations.inputType === "multiselect";
    const hasError = displayableErrors.length !== 0;

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;

            if (inputOptionsFromValidation === undefined) {
                break walk;
            }

            assert(typeof inputOptionsFromValidation === "string");

            const validator = (attribute.validators as Record<string, { options?: string[] }>)[
                inputOptionsFromValidation
            ];

            if (validator === undefined) {
                break walk;
            }

            if (validator.options === undefined) {
                break walk;
            }

            return validator.options;
        }

        return attribute.validators.options?.options ?? [];
    })();

    return (
        <FormControl fullWidth error={hasError} disabled={attribute.readOnly}>
            <InputLabel id={`${attribute.name}-label`} required={attribute.required}>
                {advancedMsg(attribute.displayName ?? "")}
            </InputLabel>
            <Select
                labelId={`${attribute.name}-label`}
                id={attribute.name}
                name={attribute.name}
                label={advancedMsg(attribute.displayName ?? "")}
                multiple={isMultiple}
                value={valueOrValues || (isMultiple ? [] : "")}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: event.target.value,
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: undefined,
                    })
                }
                sx={{ mb: 1 }}
            >
                {!isMultiple && (
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                )}
                {options.map(option => (
                    <MenuItem key={option} value={option}>
                        {inputLabel(i18n, attribute, option)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

function inputLabel(i18n: I18n, attribute: Attribute, option: string) {
    const { advancedMsg } = i18n;

    if (attribute.annotations.inputOptionLabels !== undefined) {
        const { inputOptionLabels } = attribute.annotations;

        return advancedMsg(inputOptionLabels[option] ?? option);
    }

    if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
        return advancedMsg(`${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`);
    }

    return option;
}
