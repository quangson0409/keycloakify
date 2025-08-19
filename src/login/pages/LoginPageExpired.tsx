import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Container, Box, Typography } from "@mui/material";

export default function LoginPageExpired(
  props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { url } = kcContext;

  const { msg } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("pageExpiredTitle")}
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
            maxWidth: 800,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            mx: 'auto',
            my: 2
          }}
        >
          <Typography textAlign="center" variant="h5" component="h1" gutterBottom>
            {msg("pageExpiredTitle")}
          </Typography>
          <p id="instruction1" className="instruction">
            {msg("pageExpiredMsg1")}
            <a id="loginRestartLink" href={url.loginRestartFlowUrl}>
              {msg("doClickHere")}{" "}
            </a>{" "}
            .<br />
            {msg("pageExpiredMsg2")}{" "}
            <a id="loginContinueLink" href={url.loginAction}>
              {msg("doClickHere")}
            </a>{" "}
            .
          </p>
        </Box>
      </Container>
    </Template>
  );
}
