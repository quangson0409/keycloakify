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
            registerLink: "Register",
            loadingText: "Loading Audaks Cloud...",
            // Register page
            createAccountTitle: "Create Your Account",
            joinAudaksCloud: "Join Audaks Cloud and start your digital journey",
            createAccountButton: "Create Account",
            alreadyHaveAccount: "Already have an account?",
            backToLoginLink: "Sign In",
            fullName: "Full Name",
            confirmPassword: "Confirm Password"
        },
        pt: {
            welcomeTitle: "Bem-vindo",
            loginWith: "Faça login com sua",
            audaksCloud: "Audaks Cloud",
            account: "conta",
            loginTooltip: "Acesse sua conta com seu Audaks Cloud, audaks.com.br",
            signInButton: "Entrar",
            newUserRegister: "Novo usuário?",
            registerLink: "Registrar",
            loadingText: "Carregando Audaks Cloud...",
            // Register page
            createAccountTitle: "Crie Sua Conta",
            joinAudaksCloud: "Junte-se ao Audaks Cloud e inicie sua jornada digital",
            createAccountButton: "Criar Conta",
            alreadyHaveAccount: "Já tem uma conta?",
            backToLoginLink: "Entrar",
            fullName: "Nome Completo",
            confirmPassword: "Confirmar Senha"
        },
        es: {
            welcomeTitle: "Bienvenido",
            loginWith: "Inicia sesión con tu",
            audaksCloud: "Audaks Cloud",
            account: "cuenta",
            loginTooltip: "Accede a tu cuenta con tu Audaks Cloud, audaks.com.br ",
            signInButton: "Iniciar Sesión",
            newUserRegister: "¿Nuevo usuario?",
            registerLink: "Registrarse",
            loadingText: "Cargando Audaks Cloud...",
            // Register page
            createAccountTitle: "Crea Tu Cuenta",
            joinAudaksCloud: "Únete a Audaks Cloud e inicia tu viaje digital",
            createAccountButton: "Crear Cuenta",
            alreadyHaveAccount: "¿Ya tienes una cuenta?",
            backToLoginLink: "Iniciar Sesión",
            fullName: "Nombre Completo",
            confirmPassword: "Confirmar Contraseña"
        },
        fr: {
            welcomeTitle: "Bienvenue",
            loginWith: "Connectez-vous avec votre",
            audaksCloud: "Audaks Cloud",
            account: "compte",
            loginTooltip: "Accédez à votre compte avec votre Audaks Cloud, audaks.com.br ",
            signInButton: "Se connecter",
            newUserRegister: "Nouvel utilisateur?",
            registerLink: "S'inscrire",
            loadingText: "Chargement d'Audaks Cloud...",
            // Register page
            createAccountTitle: "Créez Votre Compte",
            joinAudaksCloud: "Rejoignez Audaks Cloud et commencez votre parcours numérique",
            createAccountButton: "Créer un Compte",
            alreadyHaveAccount: "Vous avez déjà un compte?",
            backToLoginLink: "Se connecter",
            fullName: "Nom Complet",
            confirmPassword: "Confirmer le Mot de Passe"
        },
        de: {
            welcomeTitle: "Willkommen",
            loginWith: "Melden Sie sich mit Ihrem",
            audaksCloud: "Audaks Cloud",
            account: "Konto an",
            loginTooltip: "Greifen Sie auf Ihr Konto mit Ihrer Audaks Cloud, audaks.com.br",
            signInButton: "Anmelden",
            newUserRegister: "Neuer Benutzer?",
            registerLink: "Registrieren",
            loadingText: "Audaks Cloud wird geladen...",
            // Register page
            createAccountTitle: "Erstellen Sie Ihr Konto",
            joinAudaksCloud: "Treten Sie Audaks Cloud bei und beginnen Sie Ihre digitale Reise",
            createAccountButton: "Konto Erstellen",
            alreadyHaveAccount: "Haben Sie bereits ein Konto?",
            backToLoginLink: "Anmelden",
            fullName: "Vollständiger Name",
            confirmPassword: "Passwort Bestätigen"
        },
        ja: {
            welcomeTitle: "ようこそ",
            loginWith: "あなたの",
            audaksCloud: "Audaks Cloud",
            account: "アカウントでログイン",
            loginTooltip: "Audaks Cloud、audaks.com.br、またはSuper App Audaksデータでアカウントにアクセス",
            signInButton: "ログイン",
            newUserRegister: "新規ユーザー？",
            registerLink: "登録",
            loadingText: "Audaks Cloudを読み込み中...",
            // Register page
            createAccountTitle: "アカウントを作成",
            joinAudaksCloud: "Audaks Cloudに参加してデジタルの旅を始めましょう",
            createAccountButton: "アカウント作成",
            alreadyHaveAccount: "すでにアカウントをお持ちですか？",
            backToLoginLink: "ログイン",
            fullName: "フルネーム",
            confirmPassword: "パスワード確認"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
