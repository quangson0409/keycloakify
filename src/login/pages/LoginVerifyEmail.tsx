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
            {msg("emailVerifyTitle")}
          </Typography>
          <Typography variant="body1" component={"p"}>{msg("emailVerifyInstruction1", user?.email ?? "")}</Typography>
          <Typography component={"p"} sx={{ mt: 1 }}>
            {msg("emailVerifyInstruction2")}
            <br />
            <a
              href={url.loginAction}
              style={{
                color: '#1976d2',
                textDecoration: 'none',
                fontWeight: 500,
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1,
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
                window.location.href = url.loginAction;
              }}
            >
              {msg("doClickHere")}            </a>
            &nbsp;
            {msg("emailVerifyInstruction3")}
          </Typography>
        </Box>
      </Container>
    </Template>
  );
}
