import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Container, Box } from "@mui/material";

export default function LogoutConfirm(
  props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const { url, client, logoutConfirm } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("logoutConfirmTitle")}
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
          <div id="kc-logout-confirm" className="content-area">
            <p className="instruction">{msg("logoutConfirmHeader")}</p>
            <form className="form-actions" action={url.logoutConfirmAction} method="POST">
              <input type="hidden" name="session_code" value={logoutConfirm.code} />
              <div className={kcClsx("kcFormGroupClass")}>
                <div id="kc-form-options">
                  <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                </div>
                <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                  <input
                    tabIndex={4}
                    className={kcClsx(
                      "kcButtonClass",
                      "kcButtonPrimaryClass",
                      "kcButtonBlockClass",
                      "kcButtonLargeClass",
                    )}
                    name="confirmLogout"
                    id="kc-logout"
                    type="submit"
                    value={msgStr("doLogout")}
                  />
                </div>
              </div>
            </form>
            <div id="kc-info-message">
              {!logoutConfirm.skipLink && client.baseUrl && (
                <p>
                  <a href={client.baseUrl}>{msg("backToApplication")}</a>
                </p>
              )}
            </div>
          </div>
        </Box>
      </Container>
    </Template>
  );
}
