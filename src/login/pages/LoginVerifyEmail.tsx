import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Container, Box, Typography } from "@mui/material";

export default function LoginVerifyEmail(
  props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { msg } = i18n;

  const { url, user } = kcContext;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayInfo
      headerNode={msg("emailVerifyTitle")}
      infoNode={
        <p className="instruction">
          {msg("emailVerifyInstruction2")}
          <br />
          <a href={url.loginAction}>{msg("doClickHere")}</a>
          &nbsp;
          {msg("emailVerifyInstruction3")}
        </p>
      }
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
          <Typography textAlign="center" variant="h5" component="h1" gutterBottom>
            {msg("emailVerifyTitle")}
          </Typography>
          <p className="instruction">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
          <p className="instruction">
            {msg("emailVerifyInstruction2")}
            <br />
            <a href={url.loginAction}>{msg("doClickHere")}</a>
            &nbsp;
            {msg("emailVerifyInstruction3")}
          </p>
        </Box>
      </Container>
    </Template>
  );
}
