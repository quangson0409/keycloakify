import type { JSX } from "keycloakify/tools/JSX";
import { useState, useLayoutEffect } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Container,
  IconButton,
  InputAdornment,
  Tooltip,
  Alert
} from "@mui/material";
import { Error, Visibility, VisibilityOff } from "@mui/icons-material";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
  UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
  doMakeUserConfirmPassword: boolean;
};

function TermsAcceptance(props: {
  i18n: I18n;
  kcClsx: KcClsx;
  messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
  areTermsAccepted: boolean;
  onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
  const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

  const { msg } = i18n;

  return (
    <>
      <div className="form-group">
        <div className={kcClsx("kcInputWrapperClass")}>
          {msg("termsTitle")}
          <div id="kc-registration-terms-text">{msg("termsText")}</div>
        </div>
      </div>
      <div className="form-group">
        <div className={kcClsx("kcLabelWrapperClass")}>
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            className={kcClsx("kcCheckboxInputClass")}
            checked={areTermsAccepted}
            onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
            aria-invalid={messagesPerField.existsError("termsAccepted")}
          />
          <label htmlFor="termsAccepted" className={kcClsx("kcLabelClass")}>
            {msg("acceptTerms")}
          </label>
        </div>
        {messagesPerField.existsError("termsAccepted") && (
          <div className={kcClsx("kcLabelWrapperClass")}>
            <span
              id="input-error-terms-accepted"
              className={kcClsx("kcInputErrorMessageClass")}
              aria-live="polite"
              dangerouslySetInnerHTML={{
                __html: kcSanitize(messagesPerField.get("termsAccepted")),
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default function Register(props: RegisterProps) {
  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    Template,
    classes,
    UserProfileFormFields,
    doMakeUserConfirmPassword,
  } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const {
    messageHeader,
    url,
    messagesPerField,
    recaptchaRequired,
    recaptchaVisible,
    recaptchaSiteKey,
    recaptchaAction,
    termsAcceptanceRequired,
    realm,
    profile
  } = kcContext;

  const { msg, msgStr, advancedMsg } = i18n;

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  useLayoutEffect(() => {
    (window as any)["onSubmitRecaptcha"] = () => {
      // @ts-expect-error
      document.getElementById("kc-register-form").requestSubmit();
    };

    return () => {
      delete (window as any)["onSubmitRecaptcha"];
    };
  }, []);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
      displayMessage={messagesPerField.exists("global")}
      displayRequiredFields={false}
    >
      <Container maxWidth="sm" sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        minHeight: 'inherit'
      }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            mx: 'auto',
            my: 2
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={700} textAlign="center">
              {msg("createAccountTitle")}
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              {msg("joinAudaksCloud")}
            </Typography>
          </Box>

          {messagesPerField.exists("global") && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <div dangerouslySetInnerHTML={{
                __html: kcSanitize(messagesPerField.get("global"))
              }} />
            </Alert>
          )}

          <form
            id="kc-register-form"
            action={url.registrationAction}
            method="post"
          >
            {/* Use UserProfileFormFields for dynamic form fields */}
            <UserProfileFormFields
              kcContext={kcContext}
              i18n={i18n}
              kcClsx={kcClsx}
              onIsFormSubmittableValueChange={setIsFormSubmittable}
              doMakeUserConfirmPassword={doMakeUserConfirmPassword}
            />

            {termsAcceptanceRequired && (
              <TermsAcceptance
                i18n={i18n}
                kcClsx={kcClsx}
                messagesPerField={messagesPerField}
                areTermsAccepted={areTermsAccepted}
                onAreTermsAcceptedValueChange={setAreTermsAccepted}
              />
            )}

            {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                <div
                  className="g-recaptcha"
                  data-size="compact"
                  data-sitekey={recaptchaSiteKey}
                  data-action={recaptchaAction}
                />
              </Box>
            )}

            {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
              <Button
                className="g-recaptcha"
                data-sitekey={recaptchaSiteKey}
                data-callback="onSubmitRecaptcha"
                data-action={recaptchaAction}
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={termsAcceptanceRequired && !areTermsAccepted}
                sx={{ mb: 2 }}
              >
                {msg("createAccountButton")}
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                sx={{ mb: 2 }}
              >
                {msg("createAccountButton")}
              </Button>
            )}

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {msg("alreadyHaveAccount")}{" "}
                <Link
                  href={url.loginUrl}
                  variant="body2"
                  underline="hover"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  {msg("backToLoginLink")}
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Container>
    </Template>
  );
}
