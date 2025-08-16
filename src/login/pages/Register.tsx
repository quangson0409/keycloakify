import type { JSX } from "keycloakify/tools/JSX";
import { useState, useLayoutEffect } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
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
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Check, Close } from "@mui/icons-material";
import { LegalDialog, useLegalDialogs } from "../shared/LegalDialogs";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
  UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
  doMakeUserConfirmPassword: boolean;
};

// Password requirements checker
function PasswordRequirements({ password, i18n }: { password: string; i18n: I18n }) {
  const { msg } = i18n;

  const requirements = [
    {
      text: msg("passwordLength"),
      test: (pwd: string) => pwd.length >= 8,
    },
    {
      text: msg("passwordCase"),
      test: (pwd: string) => /[a-z]/.test(pwd) && /[A-Z]/.test(pwd),
    },
    {
      text: msg("passwordNumber"),
      test: (pwd: string) => /\d/.test(pwd),
    },
    {
      text: msg("passwordSpecial"),
      test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
  ];

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="body2" gutterBottom color="text.secondary">
        {msg("passwordRequirementsTitle")}
      </Typography>
      {requirements.map((req, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          {req.test(password) ? (
            <Check sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
          ) : (
            <Close sx={{ fontSize: 16, color: 'text.disabled', mr: 1 }} />
          )}
          <Typography
            variant="body2"
            color={req.test(password) ? 'success.main' : 'text.disabled'}
          >
            {req.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function TermsAcceptance(props: {
  i18n: I18n;
  messagesPerField: any;
  areTermsAccepted: boolean;
  onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}) {
  const { i18n, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange, onOpenTerms, onOpenPrivacy } = props;

  const { msg } = i18n;

  return (
    <Box sx={{ mb: 3 }}>
      <FormControlLabel
        control={
          <Checkbox
            id="termsAccepted"
            name="termsAccepted"
            checked={areTermsAccepted}
            onChange={(e) => onAreTermsAcceptedValueChange(e.target.checked)}
          />
        }
        label={
          <Typography variant="body2">
            {msg("agreeToTerms")}{" "}
            <Link
              component="button"
              color="primary"
              underline="hover"
              onClick={(e) => {
                e.preventDefault();
                onOpenTerms();
              }}
              sx={{ cursor: 'pointer' }}
            >
              {msg("termsAndConditions")}
            </Link>{" "}
            {msg("and")}{" "}
            <Link
              component="button"
              color="primary"
              underline="hover"
              onClick={(e) => {
                e.preventDefault();
                onOpenPrivacy();
              }}
              sx={{ cursor: 'pointer' }}
            >
              {msg("privacyPolicy")}
            </Link>
          </Typography>
        }
      />
      {messagesPerField.existsError("termsAccepted") && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {messagesPerField.get("termsAccepted")}
        </Typography>
      )}
    </Box>
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
    message,
    messagesPerField,
    recaptchaRequired,
    recaptchaVisible,
    recaptchaSiteKey,
    recaptchaAction,
    termsAcceptanceRequired = true
  } = kcContext;

  const { msg, advancedMsg } = i18n;

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Use shared legal dialogs hook
  const {
    termsOpen,
    privacyOpen,
    handleOpenTerms,
    handleCloseTerms,
    handleOpenPrivacy,
    handleClosePrivacy,
  } = useLegalDialogs();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Password validation
  const isPasswordValid = password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isConfirmPasswordValid = confirmPassword === password && password.length > 0;

  useLayoutEffect(() => {
    (window as any)["onSubmitRecaptcha"] = () => {
      // @ts-expect-error
      document.getElementById("kc-register-form").requestSubmit();
    };

    return () => {
      delete (window as any)["onSubmitRecaptcha"];
    };
  }, []);
  console.log(messagesPerField.exists("global"), messagesPerField)

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
      <Container maxWidth="lg" sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        minHeight: 'inherit'
      }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 800,
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

          {message !== undefined && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <div dangerouslySetInnerHTML={{
                __html: kcSanitize(message.summary)
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

            {/* Password fields */}
            <Box sx={{ mt: 3 }}>
              <TextField
                name="password"
                type={showPassword ? 'text' : 'password'}
                label={msg("password")}
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={password.length > 0 && !isPasswordValid}
                helperText={password.length > 0 && !isPasswordValid ? msg("invalidPassword") : ""}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="password-confirm"
                type={showConfirmPassword ? 'text' : 'password'}
                label={msg("passwordConfirm")}
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPassword.length > 0 && !isConfirmPasswordValid}
                helperText={confirmPassword.length > 0 && !isConfirmPasswordValid ? msg("passwordMismatch") : ""}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <PasswordRequirements password={password} i18n={i18n} />
            {/* Terms acceptance */}

            {termsAcceptanceRequired && (
              <TermsAcceptance
                i18n={i18n}
                messagesPerField={messagesPerField}
                areTermsAccepted={areTermsAccepted}
                onAreTermsAcceptedValueChange={setAreTermsAccepted}
                onOpenTerms={handleOpenTerms}
                onOpenPrivacy={handleOpenPrivacy}
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
                disabled={termsAcceptanceRequired && !areTermsAccepted ||
                  !isPasswordValid ||
                  !isConfirmPasswordValid}
                sx={{ mt: 2, mb: 2 }}
              >
                {msg("createAccountButton")}
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={!isFormSubmittable ||
                  (termsAcceptanceRequired && !areTermsAccepted) ||
                  !isPasswordValid ||
                  !isConfirmPasswordValid}
                sx={{ mb: 2, mt: 2 }}
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

      {/* Legal Dialogs */}
      <LegalDialog
        open={termsOpen}
        onClose={handleCloseTerms}
        i18n={i18n}
        type="terms"
      />
      <LegalDialog
        open={privacyOpen}
        onClose={handleClosePrivacy}
        i18n={i18n}
        type="privacy"
      />
    </Template>
  );
}
