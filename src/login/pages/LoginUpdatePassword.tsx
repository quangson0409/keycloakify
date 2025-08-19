import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginUpdatePassword(
  props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;



  const { msg, msgStr } = i18n;

  const { url, messagesPerField, isAppInitiatedAction } = kcContext;

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logoutOtherSessions, setLogoutOtherSessions] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Helper function to get error messages
  const getFieldError = (fieldName: string): string | null => {
    if (messagesPerField.existsError(fieldName)) {
      return messagesPerField.get(fieldName);
    }
    return null;
  };

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("password", "password-confirm")}
      headerNode={msg("updatePasswordTitle")}
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
            maxWidth: 600,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            mx: 'auto',
            my: 2
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={600} textAlign="center">
              {msg("updatePasswordTitle")}
            </Typography>
            {/* <Typography variant="body1" color="text.secondary" textAlign="center">
              {msg("updatePasswordDescription") || "Please update your password to continue"}
            </Typography> */}
          </Box>

          {/* Display global errors */}
          {messagesPerField.existsError("password", "password-confirm") && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <div dangerouslySetInnerHTML={{
                __html: kcSanitize(getFieldError("password") || getFieldError("password-confirm") || "")
              }} />
            </Alert>
          )}

          <form
            id="kc-passwd-update-form"
            action={url.loginAction}
            method="post"
          >
            {/* Hidden inputs for form data */}
            <input type="hidden" name="password-new" value={newPassword} />
            <input type="hidden" name="password-confirm" value={confirmPassword} />
            <input type="hidden" name="logout-sessions" value={logoutOtherSessions ? "on" : ""} />

            {/* New Password Field */}
            <TextField
              name="password-new-display"
              type={showNewPassword ? 'text' : 'password'}
              label={msg("passwordNew")}
              fullWidth
              required
              autoFocus
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!!getFieldError("password")}
              helperText={getFieldError("password")}
              sx={{ mb: 3 }}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Field */}
            <TextField
              name="password-confirm-display"
              type={showConfirmPassword ? 'text' : 'password'}
              label={msg("passwordConfirm")}
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!getFieldError("password-confirm")}
              helperText={getFieldError("password-confirm")}
              sx={{ mb: 3 }}
              autoComplete="new-password"
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

            {/* Logout Other Sessions Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={logoutOtherSessions}
                  onChange={(e) => setLogoutOtherSessions(e.target.checked)}
                  name="logout-sessions-display"
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  {msg("logoutOtherSessions")}
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexDirection: isAppInitiatedAction ? 'row' : 'column' }}>
              <Button
                type="submit"
                fullWidth={!isAppInitiatedAction}
                variant="contained"
                size="large"
                sx={{ minWidth: isAppInitiatedAction ? 120 : 'auto' }}
              >
                {msgStr("doSubmit")}
              </Button>

              {isAppInitiatedAction && (
                <Button
                  type="submit"
                  name="cancel-aia"
                  value="true"
                  variant="outlined"
                  size="large"
                  sx={{ minWidth: 120 }}
                >
                  {msg("doCancel")}
                </Button>
              )}
            </Box>
          </form>
        </Box>
      </Container>

    </Template>
  );
}
