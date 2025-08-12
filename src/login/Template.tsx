import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { useState } from "react";
import { ThemeProvider, AppBar, Toolbar, Typography, Box, Container, Link, Grid, Menu, MenuItem, Button } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LanguageIcon from "@mui/icons-material/Language";
import { themeNames } from "../kc.gen"; // Assuming themeNames is a valid MUI theme object

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: clsx(kcClsx("kcHtmlClass"), "h-full") // Add h-full for Tailwind
    });

    useSetClassName({
        qualifiedName: "body",
        className: clsx(bodyClassName ?? kcClsx("kcBodyClass"), "h-full") // Add h-full for Tailwind
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div style={{ flexGrow: 1 }}>
                {/* Header */}
                <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: '#fff' }}>
                    <Toolbar sx={{ justifyContent: "center" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                            <img src="/audaks-public.png" style={{ width: "110px", height: "110px" }} />
                        </Box>

                        {/* {enabledLanguages.length > 1 && (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <div className={kcClsx("kcLocaleMainClass")} id="kc-locale">
                                        <div id="kc-locale-wrapper" className={kcClsx("kcLocaleWrapperClass")}>
                                            <div id="kc-locale-dropdown" className={clsx("menu-button-links", kcClsx("kcLocaleDropDownClass"))}>
                                                <button
                                                    tabIndex={1}
                                                    id="kc-current-locale-link"
                                                    aria-label={msgStr("languages")}
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                    aria-controls="language-switch1"
                                                >
                                                    {currentLanguage.label}
                                                </button>
                                                <ul
                                                    role="menu"
                                                    tabIndex={-1}
                                                    aria-labelledby="kc-current-locale-link"
                                                    aria-activedescendant=""
                                                    id="language-switch1"
                                                    className={kcClsx("kcLocaleListClass")}
                                                >
                                                    {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                                        <li key={languageTag} className={kcClsx("kcLocaleListItemClass")} role="none">
                                                            <a
                                                                role="menuitem"
                                                                id={`language-${i + 1}`}
                                                                className={kcClsx("kcLocaleItemClass")}
                                                                href={href}
                                                            >
                                                                {label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            )} */}
                    </Toolbar>
                </AppBar>
                {/* Main Content */}
                <Box sx={{ flexGrow: 1, pb: 10 }}>
                    {" "}
                    {/* Add padding-bottom to account for fixed footer */}
                    <div className={kcClsx("kcFormCardClass")}>
                        <header className={kcClsx("kcFormHeaderClass")}>
                            {(() => {
                                const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                    <h1 id="kc-page-title">{headerNode}</h1>
                                ) : (
                                    <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                        <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                                        <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                            <div className="kc-login-tooltip">
                                                <i className={kcClsx("kcResetFlowIcon")}></i>
                                                <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                            </div>
                                        </a>
                                    </div>
                                );

                                if (displayRequiredFields) {
                                    return (
                                        <div className={kcClsx("kcContentWrapperClass")}>
                                            <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
                                                <span className="subtitle">
                                                    <span className="required">*</span>
                                                    {msg("requiredFields")}
                                                </span>
                                            </div>
                                            <div className="col-md-10">{node}</div>
                                        </div>
                                    );
                                }

                                return node;
                            })()}
                        </header>
                        <div id="kc-content">
                            <div id="kc-content-wrapper">
                                {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                                {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                    <div
                                        className={clsx(
                                            `alert-${message.type}`,
                                            kcClsx("kcAlertClass"),
                                            `pf-m-${message?.type === "error" ? "danger" : message.type}`
                                        )}
                                    >
                                        <div className="pf-c-alert__icon">
                                            {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                                            {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                                            {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                                            {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                                        </div>
                                        <span
                                            className={kcClsx("kcAlertTitleClass")}
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(message.summary)
                                            }}
                                        />
                                    </div>
                                )}
                                {children}
                                {auth !== undefined && auth.showTryAnotherWayLink && (
                                    <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                        <div className={kcClsx("kcFormGroupClass")}>
                                            <input type="hidden" name="tryAnotherWay" value="on" />
                                            <a
                                                href="#"
                                                id="try-another-way"
                                                onClick={() => {
                                                    document.forms["kc-select-try-another-way-form" as never].requestSubmit();
                                                    return false;
                                                }}
                                            >
                                                {msg("doTryAnotherWay")}
                                            </a>
                                        </div>
                                    </form>
                                )}
                                {socialProvidersNode}
                                {displayInfo && (
                                    <div id="kc-info" className={kcClsx("kcSignUpClass")}>
                                        <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                                            {infoNode}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Box>{" "}
                {/* Closing the Box that wraps the main content */}
                {/* Footer */}
                <footer style={{ position: "absolute", bottom: 0, width: "100%", padding: "16px 0", backgroundColor: "#f0f0f0" }}>
                    <Container maxWidth="lg">
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        © 2025 Audaks Cloud
                                    </Typography>
                                    <Link href="#" color="primary" underline="hover" variant="body2">
                                        Terms and conditions
                                    </Link>
                                    <Link href="#" color="primary" underline="hover" variant="body2">
                                        Privacy Policies
                                    </Link>
                                </Box>

                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                    <Link href="#" color="primary" underline="hover" variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                                        <HelpOutlineIcon sx={{ fontSize: 16, mr: 0.5 }} /> Precisa de ajuda?
                                    </Link>
                                    {enabledLanguages.length > 1 && (
                                        <LanguageSelector
                                            currentLanguage={currentLanguage}
                                            enabledLanguages={enabledLanguages}
                                            msgStr={msgStr}
                                        />
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </footer>
            </div>
        </div>
    );
}

interface LanguageSelectorProps {
    currentLanguage: I18n["currentLanguage"];
    enabledLanguages: I18n["enabledLanguages"];
    msgStr: I18n["msgStr"];
}

function LanguageSelector({ currentLanguage, enabledLanguages, msgStr }: LanguageSelectorProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                id="language-button"
                aria-controls={open ? 'language-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="primary"
                sx={{ display: "flex", alignItems: "center" }}
            >
                <img
                    src={`https://flagsapi.com/${currentLanguage.languageTag.toUpperCase().split('-')[0]}/flat/16.png`}
                    alt={`${currentLanguage.label} flag`}
                    style={{ width: 16, height: 16, marginRight: 8 }}
                />
                {currentLanguage.label}
                <LanguageIcon sx={{ fontSize: 16, ml: 0.5 }} />
            </Button>
            <Menu
                id="language-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'language-button',
                }}
            >
                {enabledLanguages.map(({ languageTag, label, href }) => (
                    <MenuItem key={languageTag} onClick={handleClose} component="a" href={href}>
                        <img
                            src={`https://flagsapi.com/${languageTag.toUpperCase().split('-')[0]}/flat/16.png`}
                            alt={`${label} flag`}
                            style={{ width: 16, height: 16, marginRight: 8 }}
                        />
                        {label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
