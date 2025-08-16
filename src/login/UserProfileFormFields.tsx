import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import { UserProfileFields } from "../shared/keycloak-ui-shared/user-profile/UserProfileFields";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function UserProfileFormFields(props: UserProfileFormFieldsProps) {
    const { kcContext, i18n, onIsFormSubmittableValueChange } = props;

    const { advancedMsg } = i18n;
    const { profile } = kcContext;

    // Create form instance
    const form = useForm({
        mode: "onChange",
        defaultValues: {}
    });

    // Convert kcContext.profile to UserProfileMetadata format
    const userProfileMetadata = {
        attributes: profile?.attributesByName
            ? Object.values(profile.attributesByName).filter((attr): attr is NonNullable<typeof attr> => attr !== null && attr !== undefined)
            : [],
        groups: undefined
    };

    // Update form submittability based on form validation state
    useEffect(() => {
        const isValid = form.formState.isValid;
        const hasValues = Object.keys(form.watch()).length > 0;
        onIsFormSubmittableValueChange?.(isValid && hasValues);
    }, [form.formState.isValid, form.watch(), onIsFormSubmittableValueChange]);
    console.log("UserProfileFormFields rendered with form state:", userProfileMetadata);

    return (
        <UserProfileFields
            t={advancedMsg}
            form={form}
            userProfileMetadata={userProfileMetadata}
            supportedLocales={[]}
            currentLocale={kcContext.locale?.currentLanguageTag || "en"}
            hideReadOnly={false}
        />
    );
}
