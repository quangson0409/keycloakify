import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
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
    Tooltip
} from "@mui/material";
import { Error, Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container">
                    <div id="kc-registration">
                        <span>
                            {msg("noAccount")}{" "}
                            <a tabIndex={8} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <hr />
                            <h2>{msg("identity-provider-login-label")}</h2>
                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <a
                                            id={`social-${p.alias}`}
                                            className={kcClsx(
                                                "kcFormSocialAccountListButtonClass",
                                                providers.length > 3 && "kcFormSocialAccountGridItem"
                                            )}
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                            <span
                                                className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                            ></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <Container maxWidth="lg" sx={{ height: "100%" }} >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 1,
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            bgcolor: 'primary.main',
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white'
                        }}
                    >
                        {/* You can add illustration or logo here */}
                        <img src={`${url.resourcesPath}/img/login-banner.svg`} alt="Login Banner" style={{ maxWidth: '100%', height: 'auto' }} />
                    </Box>

                    <Box sx={{ flex: 1, p: 4 }}>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h4" component="h1" gutterBottom fontWeight={"700"}>
                                {msg("welcomeTitle")}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {msg("loginWith")} <strong>{msg("audaksCloud")}</strong> {msg("account")}
                                <Tooltip title={msg("loginTooltip")} arrow>
                                    <IconButton
                                        sx={{
                                            cursor: 'pointer',
                                            color: 'primary.main',
                                            fontWeight: 'bold',
                                            fontSize: '1.1em'
                                        }}
                                    >
                                        <Error fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </Box>

                        {realm.password && (
                            <form
                                id="kc-form-login"
                                onSubmit={() => {
                                    setIsLoginButtonDisabled(true);
                                    return true;
                                }}
                                action={url.loginAction}
                                method="post"
                            >
                                {!usernameHidden && (
                                    <TextField
                                        tabIndex={2}
                                        id="username"
                                        name="username"
                                        label={!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                                ? msg("usernameOrEmail")
                                                : msg("email")}
                                        defaultValue={login.username ?? ""}
                                        variant="outlined"
                                        fullWidth
                                        autoFocus
                                        size="medium"
                                        required
                                        autoComplete="username"
                                        error={messagesPerField.existsError("username", "password")}
                                        helperText={messagesPerField.existsError("username", "password")
                                            ? messagesPerField.getFirstError("username", "password")
                                            : ""}
                                        sx={{ mb: 2 }}
                                    />
                                )}

                                <TextField
                                    tabIndex={3}
                                    id="password"
                                    name="password"
                                    label={msg("password")}
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    size="medium"
                                    autoComplete="current-password"
                                    error={messagesPerField.existsError("username", "password")}
                                    helperText={messagesPerField.existsError("username", "password")
                                        ? messagesPerField.getFirstError("username", "password")
                                        : ""}
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
                                    sx={{ mb: 2 }}
                                />

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 3
                                }}>
                                    {realm.rememberMe && !usernameHidden && (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    defaultChecked={!!login.rememberMe}
                                                />
                                            }
                                            label={msg("rememberMe")}
                                        />
                                    )}

                                    {realm.resetPasswordAllowed && (
                                        <Link
                                            href={url.loginResetCredentialsUrl}
                                            variant="body2"
                                            underline="hover"
                                            sx={{ ml: 'auto' }}
                                        >
                                            {msg("doForgotPassword")}
                                        </Link>
                                    )}
                                </Box>

                                <input
                                    type="hidden"
                                    id="id-hidden-input"
                                    name="credentialId"
                                    value={auth.selectedCredential}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={isLoginButtonDisabled}
                                    sx={{ mb: 2 }}
                                >
                                    {msg("signInButton")}
                                </Button>

                                {realm.registrationAllowed && !registrationDisabled && (
                                    <Box sx={{
                                        textAlign: 'center',
                                        // mt: 2,
                                        // p: 1,
                                        // border: '1px solid red', // Debug border
                                        // backgroundColor: 'rgba(0,255,0,0.1)' // Debug background
                                    }}>
                                        <Typography variant="body2" color="text.secondary">
                                            {msg("newUserRegister")}{" "}
                                            <a
                                                href={url.registrationUrl}
                                                style={{
                                                    color: '#1976d2',
                                                    textDecoration: 'none',
                                                    fontWeight: 500,
                                                    cursor: 'pointer',
                                                    position: 'relative',
                                                    zIndex: 9999,
                                                    display: 'inline-block',
                                                    padding: '4px 8px',
                                                    // border: '1px solid blue' // Debug border for link
                                                }}
                                                onMouseOver={(e) => {
                                                    const target = e.currentTarget as HTMLAnchorElement;
                                                    target.style.textDecoration = 'underline';
                                                    // target.style.backgroundColor = 'rgba(25, 118, 210, 0.1)';
                                                }}
                                                onMouseOut={(e) => {
                                                    const target = e.currentTarget as HTMLAnchorElement;
                                                    target.style.textDecoration = 'none';
                                                    target.style.backgroundColor = 'transparent';
                                                }}
                                                onClick={() => {
                                                    console.log('Register link clicked!', url.registrationUrl);
                                                    // Don't prevent default, let it navigate
                                                }}
                                            >
                                                {msg("registerLink")}
                                            </a>
                                        </Typography>
                                    </Box>
                                )}
                            </form>
                        )}
                    </Box>
                </Box>
            </Container>
        </Template>
    );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { kcClsx, i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

    return (
        <div className={kcClsx("kcInputGroup")}>
            {children}
            <button
                type="button"
                className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i className={kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow")} aria-hidden />
            </button>
        </div>
    );
}
