import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Container,
    Link,
    Grid,
    Menu,
    MenuItem,
    Button,
    CircularProgress,
    Backdrop
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { LegalDialog, useLegalDialogs } from "./shared/LegalDialogs";
import LanguageIcon from "@mui/icons-material/Language";

// Function to get appropriate flag for language
const getLanguageFlag = (languageTag: string): string => {
    const language = languageTag.toLowerCase();

    // Custom mapping for specific languages
    const languageFlagMap: Record<string, string> = {
        // English variants
        'en': 'GB',      // English -> Great Britain flag
        'en-us': 'US',   // English US -> US flag
        'en-gb': 'GB',   // English GB -> GB flag
        'en-au': 'AU',   // English Australia -> Australia flag
        'en-ca': 'CA',   // English Canada -> Canada flag

        // Vietnamese
        'vi': 'VN',      // Vietnamese -> Vietnam flag
        'vi-vn': 'VN',   // Vietnamese Vietnam -> Vietnam flag

        // Portuguese variants
        'pt-br': 'BR',   // Portuguese Brazil -> Brazil flag
        'pt': 'PT',      // Portuguese -> Portugal flag
        'pt-pt': 'PT',   // Portuguese Portugal -> Portugal flag

        // Spanish variants
        'es': 'ES',      // Spanish -> Spain flag
        'es-mx': 'MX',   // Spanish Mexico -> Mexico flag
        'es-ar': 'AR',   // Spanish Argentina -> Argentina flag
        'es-co': 'CO',   // Spanish Colombia -> Colombia flag

        // French variants
        'fr': 'FR',      // French -> France flag
        'fr-ca': 'CA',   // French Canada -> Canada flag
        'fr-be': 'BE',   // French Belgium -> Belgium flag

        // Chinese variants
        'zh': 'CN',      // Chinese -> China flag
        'zh-cn': 'CN',   // Chinese Simplified -> China flag
        'zh-tw': 'TW',   // Chinese Traditional -> Taiwan flag
        'zh-hk': 'HK',   // Chinese Hong Kong -> Hong Kong flag

        // Other popular languages
        'ja': 'JP',      // Japanese -> Japan flag
        'ko': 'KR',      // Korean -> South Korea flag
        'ar': 'SA',      // Arabic -> Saudi Arabia flag
        'hi': 'IN',      // Hindi -> India flag
        'th': 'TH',      // Thai -> Thailand flag
        'ms': 'MY',      // Malay -> Malaysia flag
        'id': 'ID',      // Indonesian -> Indonesia flag
        'tl': 'PH',      // Filipino -> Philippines flag
        'sw': 'TZ',      // Swahili -> Tanzania flag
        'he': 'IL',      // Hebrew -> Israel flag
        'de': 'DE',      // German -> Germany flag
        'it': 'IT',      // Italian -> Italy flag
        'ru': 'RU',      // Russian -> Russia flag
        'nl': 'NL',      // Dutch -> Netherlands flag
    };

    // Check for exact match first
    if (languageFlagMap[language]) {
        return languageFlagMap[language];
    }

    // Fallback to first part of language tag
    const baseLang = language.split('-')[0];
    if (languageFlagMap[baseLang]) {
        return languageFlagMap[baseLang];
    }

    // Final fallback: use original country code (uppercase)
    const fallback = languageTag.toUpperCase().split("-")[0];

    // If it's a 2-letter code, use it; otherwise use 'UN' as universal fallback
    return fallback.length === 2 ? fallback : 'UN';
};

// Function to handle image error with multiple fallbacks
const handleFlagError = (e: React.SyntheticEvent<HTMLImageElement>, languageTag: string) => {
    const target = e.target as HTMLImageElement;
    const currentSrc = target.src;

    // Try different fallback strategies
    if (currentSrc.includes('/flat/')) {
        // If flat style failed, try shiny style
        const shinyUrl = currentSrc.replace('/flat/', '/shiny/');
        target.src = shinyUrl;
    } else if (!currentSrc.includes('UN/flat/')) {
        // If country-specific flag failed, use UN flag
        target.src = `https://flagsapi.com/UN/flat/16.png`;
    } else {
        // Final fallback: use a simple language icon
        target.style.display = 'none';
        // Log for debugging
        console.warn(`Failed to load flag for language: ${languageTag}`);
    }
};

// Reusable flag icon component
const FlagIcon = ({ languageTag, label, size = 16 }: { languageTag: string; label: string; size?: number }) => (
    <img
        src={`https://flagsapi.com/${getLanguageFlag(languageTag)}/flat/${size}.png`}
        alt={`${label} flag`}
        style={{ width: size, height: size, marginRight: 8 }}
        onError={(e) => handleFlagError(e, languageTag)}
    />
);

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children,
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, url } = kcContext;

    const [isLoading, setIsLoading] = useState(true);

    // Use shared legal dialogs hook
    const {
        termsOpen,
        privacyOpen,
        handleOpenTerms,
        handleCloseTerms,
        handleOpenPrivacy,
        handleClosePrivacy,
    } = useLegalDialogs();

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    // Loading effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Loading duration: 1.5 seconds

        return () => clearTimeout(timer);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: clsx(kcClsx("kcHtmlClass"), "h-full"), // Add h-full for Tailwind
    });

    useSetClassName({
        qualifiedName: "body",
        className: clsx(bodyClassName ?? kcClsx("kcBodyClass"), "h-full"), // Add h-full for Tailwind
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender || isLoading) {
        return (
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(245, 245, 245, 0.9)',
                    backdropFilter: 'blur(8px)'
                }}
                open={true}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3
                }}>
                    <img
                        src={`${url.resourcesPath}/img/logo-light.svg`}
                        alt="Audaks Cloud"
                        style={{
                            width: "120px",
                            height: "110px",
                            opacity: 0.8
                        }}
                    />
                    <CircularProgress
                        size={60}
                        thickness={4}
                        sx={{
                            color: 'primary.main',
                            '& .MuiCircularProgress-circle': {
                                strokeLinecap: 'round',
                            }
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'text.primary',
                            fontWeight: 500,
                            opacity: 0.8
                        }}
                    >
                        {msgStr("loadingText")}
                    </Typography>
                </Box>
            </Backdrop>
        );
    }

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#f5f5f5", // Light gray background
                background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)" // Subtle gradient
            }}
        >
            <Box sx={{ flexGrow: 1, position: "relative" }}>
                {/* Background Pattern */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.05,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        zIndex: 0
                    }}
                />

                {/* Header */}
                <AppBar
                    position="static"
                    color="transparent"
                    elevation={0}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(8px)",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <Toolbar sx={{ justifyContent: "center" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                            <img src={`${url.resourcesPath}/img/logo-light.svg`} alt="Audaks Cloud" style={{ width: "110px", height: "100px" }} />
                        </Box>
                    </Toolbar>
                </AppBar>
                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        minHeight: "calc(100vh - 165px)", // 100px header + 65px footer
                        flex: 1,
                    }}
                >
                    {/* {displayMessage &&
                        message !== undefined &&
                        (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div
                                className={clsx(
                                    `alert-${message.type}`,
                                    kcClsx("kcAlertClass"),
                                    `pf-m-${message?.type === "error" ? "danger" : message.type}`,
                                )}
                            >
                                <div className="pf-c-alert__icon">
                                    {message.type === "success" && (
                                        <span className={kcClsx("kcFeedbackSuccessIcon")}></span>
                                    )}
                                    {message.type === "warning" && (
                                        <span className={kcClsx("kcFeedbackWarningIcon")}></span>
                                    )}
                                    {message.type === "error" && (
                                        <span className={kcClsx("kcFeedbackErrorIcon")}></span>
                                    )}
                                    {message.type === "info" && (
                                        <span className={kcClsx("kcFeedbackInfoIcon")}></span>
                                    )}
                                </div>
                                <span
                                    className={kcClsx("kcAlertTitleClass")}
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(message.summary),
                                    }}
                                />
                            </div>
                        )} */}
                    {children}
                    {/* {auth !== undefined && auth.showTryAnotherWayLink && (
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
                    {socialProvidersNode} */}
                    {/* {displayInfo && (
                        <div id="kc-info" className={kcClsx("kcSignUpClass")}>
                            <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                                {infoNode}
                            </div>
                        </div>
                    )} */}
                </Box>

                {/* Footer */}
                <footer style={{
                    width: "100%",
                    padding: "8px 0",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    height: "65px",
                    // backdropFilter: "blur(8px)",
                    // borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                    // marginTop: "auto"
                }}>
                    <Container maxWidth="lg">
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        © 2025 Audaks Cloud
                                    </Typography>
                                    <Link
                                        component="button"
                                        onClick={handleOpenTerms}
                                        color="primary"
                                        underline="hover"
                                        variant="body2"
                                        sx={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        {msg("termsAndConditions")}
                                    </Link>
                                    <Link
                                        component="button"
                                        onClick={handleOpenPrivacy}
                                        color="primary"
                                        underline="hover"
                                        variant="body2"
                                        sx={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        {msg("privacyPolicy")}
                                    </Link>
                                </Box>

                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                    {/* <Link href="https://example.com/help" color="primary" underline="hover" variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                                        <HelpOutlineIcon sx={{ fontSize: 16, mr: 0.5 }} /> Precisa de ajuda?
                                    </Link> */}
                                    {enabledLanguages.length > 1 && (
                                        <LanguageSelector
                                            currentLanguage={currentLanguage}
                                            enabledLanguages={enabledLanguages}
                                        />
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </footer>
            </Box>{" "}
            {/* Closing the Box that wraps the main content */}

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
        </Box>
    )

    interface LanguageSelectorProps {
        currentLanguage: I18n["currentLanguage"];
        enabledLanguages: I18n["enabledLanguages"];
    }

    function LanguageSelector({ currentLanguage, enabledLanguages }: LanguageSelectorProps) {
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
                    aria-controls={open ? "language-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    color="primary"
                    sx={{ display: "flex", alignItems: "center" }}
                >
                    <FlagIcon languageTag={currentLanguage.languageTag} label={currentLanguage.label} />
                    {currentLanguage.label}
                    <LanguageIcon sx={{ fontSize: 16, ml: 0.5 }} />
                </Button>
                <Menu
                    id="language-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "language-button",
                    }}
                >
                    {enabledLanguages.map(({ languageTag, label, href }) => (
                        <MenuItem key={languageTag} onClick={handleClose} component="a" href={href}>
                            <FlagIcon languageTag={languageTag} label={label} />
                            {label}
                        </MenuItem>
                    ))}
                </Menu>
            </>
        );
    }
}