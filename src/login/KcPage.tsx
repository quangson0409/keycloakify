import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import Template from "./Template";
import DefaultPage from "keycloakify/login/DefaultPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Login = lazy(() => import("./pages/Login"));
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#007bff" // A different primary color
        },
        secondary: {
            main: "#6c757d" // A different secondary color
        }
    },
    typography: {
        fontFamily: "Arial, sans-serif"
    }
});

export default function KcPage(props: { kcContext: KcContext }) {
    return (
        <ThemeProvider theme={customTheme}>
            <KcPageContextualized {...props} />
        </ThemeProvider>
    );
}

function KcPageContextualized(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <ThemeProvider theme={customTheme}>
            <Suspense>
                {(() => {
                    switch (kcContext.pageId) {
                        case "login.ftl":
                            return (
                                <Login
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        default:
                            return (
                                <DefaultPage
                                    kcContext={kcContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                    }
                })()}
            </Suspense>
        </ThemeProvider>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
