/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            welcomeTitle: "Welcome",
            loginWith: "Log in with your",
            audaksCloud: "Audaks Cloud",
            account: "account",
            loginTooltip: "Access your account with your Audaks Cloud, audaks.com.br",
            signInButton: "Sign In",
            newUserRegister: "New user?",
            registerLink: "Register"
        },
        pt: {
            welcomeTitle: "Bem-vindo",
            loginWith: "Faça login com sua",
            audaksCloud: "Audaks Cloud",
            account: "conta",
            loginTooltip: "Acesse sua conta com seu Audaks Cloud, audaks.com.br",
            signInButton: "Entrar",
            newUserRegister: "Novo usuário?",
            registerLink: "Registrar"
        },
        es: {
            welcomeTitle: "Bienvenido",
            loginWith: "Inicia sesión con tu",
            audaksCloud: "Audaks Cloud",
            account: "cuenta",
            loginTooltip: "Accede a tu cuenta con tu Audaks Cloud, audaks.com.br ",
            signInButton: "Iniciar Sesión",
            newUserRegister: "¿Nuevo usuario?",
            registerLink: "Registrarse"
        },
        fr: {
            welcomeTitle: "Bienvenue",
            loginWith: "Connectez-vous avec votre",
            audaksCloud: "Audaks Cloud",
            account: "compte",
            loginTooltip: "Accédez à votre compte avec votre Audaks Cloud, audaks.com.br ",
            signInButton: "Se connecter",
            newUserRegister: "Nouvel utilisateur?",
            registerLink: "S'inscrire"
        },
        de: {
            welcomeTitle: "Willkommen",
            loginWith: "Melden Sie sich mit Ihrem",
            audaksCloud: "Audaks Cloud",
            account: "Konto an",
            loginTooltip: "Greifen Sie auf Ihr Konto mit Ihrer Audaks Cloud, audaks.com.br",
            signInButton: "Anmelden",
            newUserRegister: "Neuer Benutzer?",
            registerLink: "Registrieren"
        },
        ja: {
            welcomeTitle: "ようこそ",
            loginWith: "あなたの",
            audaksCloud: "Audaks Cloud",
            account: "アカウントでログイン",
            loginTooltip: "Audaks Cloud、audaks.com.br、またはSuper App Audaksデータでアカウントにアクセス",
            signInButton: "ログイン",
            newUserRegister: "新規ユーザー？",
            registerLink: "登録"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
