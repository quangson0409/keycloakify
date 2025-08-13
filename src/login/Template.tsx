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
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";

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
        children,
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    const [termsOpen, setTermsOpen] = useState(false);
    const [privacyOpen, setPrivacyOpen] = useState(false);

    const handleTermsOpen = () => setTermsOpen(true);
    const handleTermsClose = () => setTermsOpen(false);
    const handlePrivacyOpen = () => setPrivacyOpen(true);
    const handlePrivacyClose = () => setPrivacyOpen(false);

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
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

    if (!isReadyToRender) {
        return null;
    }

    return (
        <Box
            sx={{
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
                            <img src="/audaks-public.png" style={{ width: "110px", height: "100px" }} />
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
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    padding: "16px 0",
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                    zIndex: 2
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
                                        onClick={handleTermsOpen}
                                        color="primary"
                                        underline="hover"
                                        variant="body2"
                                        sx={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        Terms and conditions
                                    </Link>
                                    <Link
                                        component="button"
                                        onClick={handlePrivacyOpen}
                                        color="primary"
                                        underline="hover"
                                        variant="body2"
                                        sx={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
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
            </Box>{" "}
            {/* Closing the Box that wraps the main content */}

            {/* Terms and Conditions Dialog */}
            <Dialog
                open={termsOpen}
                onClose={handleTermsClose}
                maxWidth="md"
                fullWidth
                scroll="paper"
                PaperProps={{
                    sx: {
                        height: '80vh',
                        maxHeight: '700px',
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }}
            >
                <DialogTitle sx={{
                    m: 0,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    flexShrink: 0
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        Terms and conditions
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleTermsClose}
                        sx={{ color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent
                    dividers
                    sx={{
                        p: 3,
                        flex: 1,
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#c1c1c1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#a8a8a8',
                        },
                    }}
                >
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                        TERMOS DE USO – AUDAKS CLOUD
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Estes Termos de Uso ("Termos") estabelecem os termos e condições que regem os serviços da Audaks Cloud contratados pelo
                        USUÁRIO junto à AUDAKS. Para fins destes Termos, "USUÁRIO" quer dizer a pessoa física ou jurídica cadastrada na Plataforma
                        Audaks Cloud, responsável pela contratação e utilização dos serviços. E "AUDAKS" significa a empresa AUDAKS TECHNOLOGY SOLUTIONS,
                        prestadora de serviços de tecnologia em nuvem, soluções de identidade digital e infraestrutura como serviço.
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        O USUÁRIO garante que leu os Termos e está apto a formalizar a contratação nele prevista, segundo os Termos, em
                        perfeitas condições morais, intelectuais e legais para tal. Se o USUÁRIO estiver agindo em nome de uma outra pessoa
                        (empresa, por exemplo), ao aceitar estes Termos, o USUÁRIO estará declarando ser civilmente capaz, possuir a capacidade
                        técnica e o necessário vínculo jurídico com esta outra pessoa, sendo plenos poderes para: (i) vincular e obrigar essa aos
                        Termos, e (ii) demais poderes de representação e administração. Ao aceitar estes Termos, o aceite constituirá um contrato
                        válido e vinculativo entre as Partes.
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        O USUÁRIO declara, sob as penas da lei, que todas as informações fornecidas são verdadeiras, exatas e completas,
                        comprometendo-se a manter os dados sempre atualizados. O USUÁRIO é o único responsável pela exatidão das informações
                        fornecidas e pelo uso que fizer dos serviços.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mt: 3 }}>
                        1. OBJETO DOS SERVIÇOS
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Os serviços da Audaks Cloud consistem em uma plataforma integrada de tecnologia em nuvem que oferece soluções de
                        identidade digital, infraestrutura como serviço (IaaS), plataforma como serviço (PaaS), incluindo mas não limitado a:
                        autenticação única (SSO), gerenciamento de identidade e acesso (IAM), hospedagem em nuvem, APIs de integração,
                        monitoramento e analytics, e outros serviços relacionados à tecnologia em nuvem.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mt: 3 }}>
                        2. RESPONSABILIDADES DO USUÁRIO
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        O USUÁRIO se compromete a: (i) utilizar os serviços de forma adequada e em conformidade com estes Termos; (ii) manter
                        a confidencialidade de suas credenciais de acesso; (iii) não compartilhar sua conta com terceiros não autorizados; (iv) notificar
                        imediatamente qualquer uso não autorizado de sua conta; (v) não utilizar os serviços para atividades ilegais ou que
                        violem direitos de terceiros; (vi) respeitar os limites de uso e recursos estabelecidos no plano contratado.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mt: 3 }}>
                        3. PRIVACIDADE E PROTEÇÃO DE DADOS
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        A AUDAKS se compromete a proteger os dados pessoais do USUÁRIO em conformidade com a Lei Geral de Proteção de Dados
                        (LGPD), GDPR e demais legislações aplicáveis. Implementamos medidas de segurança robustas incluindo criptografia,
                        controles de acesso, monitoramento contínuo e auditoria de segurança. Para mais informações detalhadas sobre como
                        coletamos, utilizamos e protegemos seus dados, consulte nossa Política de Privacidade.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mt: 3 }}>
                        4. LIMITAÇÃO DE RESPONSABILIDADE
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        A AUDAKS não se responsabiliza por danos diretos ou indiretos decorrentes do uso dos serviços, incluindo mas não
                        limitado a: interrupções temporárias dos serviços por manutenção programada, perda de dados por falha do USUÁRIO,
                        danos causados por ataques de terceiros, ou uso inadequado dos serviços pelo USUÁRIO. A responsabilidade da AUDAKS
                        está limitada ao valor pago pelo USUÁRIO pelos serviços nos últimos 12 meses, garantindo SLA de 99.9% de disponibilidade.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mt: 3 }}>
                        5. MODIFICAÇÕES DOS TERMOS
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        A AUDAKS se reserva o direito de modificar estes Termos mediante notificação prévia de 30 dias ao USUÁRIO. As modificações
                        entrarão em vigor após o período de notificação. O uso continuado dos serviços após a vigência das modificações
                        constituirá aceitação dos novos termos. Caso não concorde, o USUÁRIO poderá cancelar os serviços sem penalidades.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)', flexShrink: 0 }}>
                    <Button onClick={handleTermsClose} variant="contained" sx={{ minWidth: 100 }}>
                        Return
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Privacy Policies Dialog */}
            <Dialog
                open={privacyOpen}
                onClose={handlePrivacyClose}
                maxWidth="md"
                fullWidth
                scroll="paper"
                PaperProps={{
                    sx: {
                        height: '80vh',
                        maxHeight: '700px',
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }}
            >
                <DialogTitle sx={{
                    m: 0,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    flexShrink: 0
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        Privacy Policies
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handlePrivacyClose}
                        sx={{ color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent
                    dividers
                    sx={{
                        p: 3,
                        flex: 1,
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#c1c1c1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#a8a8a8',
                        },
                    }}
                >
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                        POLÍTICA DE PRIVACIDADE – AUDAKS CLOUD
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Esta Política de Privacidade descreve como a AUDAKS coleta, usa, processa e protege as informações pessoais dos usuários
                        dos serviços da Audaks Cloud. Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política.
                        Estamos comprometidos com a transparência e proteção de seus dados pessoais.
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                        1. INFORMAÇÕES QUE COLETAMOS
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone, CPF/CNPJ, e outras informações de
                        identificação necessárias para a prestação dos serviços de tecnologia em nuvem. Também coletamos automaticamente dados
                        de navegação, logs de sistema, endereço IP, tipo de dispositivo, informações de geolocalização, métricas de performance
                        e dados de utilização dos recursos da plataforma.
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                        2. COMO USAMOS SUAS INFORMAÇÕES
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Utilizamos suas informações para fornecer, manter e melhorar nossos serviços de nuvem, processar transações e cobrança,
                        comunicar sobre atualizações e manutenções, personalizar sua experiência na plataforma, garantir a segurança e
                        prevenção de fraudes, cumprir obrigações legais, e fornecer suporte técnico especializado.
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                        3. COMPARTILHAMENTO DE INFORMAÇÕES
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins comerciais, exceto conforme
                        descrito nesta política. Podemos compartilhar informações com provedores de serviços confiáveis, autoridades legais
                        quando exigido por lei, parceiros de integração mediante seu consentimento, ou em caso de fusão, aquisição ou
                        reestruturação societária.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                        4. SEGURANÇA DOS DADOS
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Implementamos medidas de segurança técnicas, administrativas e físicas de nível enterprise para proteger suas informações:
                        criptografia AES-256, autenticação multifator (MFA), controles de acesso baseados em função (RBAC), monitoramento 24/7,
                        auditoria de segurança, backup automático, e conformidade com padrões ISO 27001 e SOC 2.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                        5. SEUS DIREITOS
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Você tem direitos abrangentes sobre seus dados: acessar, corrigir, atualizar ou excluir informações pessoais,
                        solicitar portabilidade dos dados, revogar consentimentos específicos, se opor ao processamento em determinadas
                        circunstâncias, e receber relatórios de atividade de seus dados. Para exercer esses direitos, utilize nosso
                        portal de privacidade ou entre em contato através dos canais oficiais.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                        6. RETENÇÃO DE DADOS
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Mantemos suas informações pelo tempo necessário para: cumprir finalidades descritas nesta política,
                        atender obrigações legais e regulatórias, resolver disputas e fazer cumprir acordos. Dados operacionais
                        são mantidos durante a vigência do contrato, dados de auditoria por 5 anos, e dados de backup por até 7 anos
                        conforme melhores práticas de segurança.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                        7. COOKIES E TECNOLOGIAS SIMILARES
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Utilizamos cookies essenciais, funcionais e analíticos para otimizar sua experiência: autenticação SSO,
                        personalização de interface, análise de performance, e monitoramento de segurança. Você pode gerenciar
                        preferências através do nosso Centro de Privacidade ou configurações do navegador, respeitando cookies
                        técnicos necessários para funcionamento da plataforma.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                        8. TRANSFERÊNCIAS INTERNACIONAIS
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Seus dados podem ser processados em datacenters globais da Audaks Cloud ou parceiros certificados.
                        Garantimos transferências seguras através de: cláusulas contratuais padrão (SCCs), certificações de
                        adequação, criptografia em trânsito e repouso, e conformidade com GDPR, LGPD e regulamentações locais
                        de proteção de dados.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                        9. ALTERAÇÕES DESTA POLÍTICA
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Revisamos e atualizamos esta Política periodicamente para refletir melhorias nos serviços e mudanças
                        regulatórias. Notificaremos sobre alterações significativas com 30 dias de antecedência através de
                        e-mail, dashboard da plataforma ou aviso em nosso site. Mantenha-se informado sobre nossas práticas
                        de privacidade revisando esta política regularmente.
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                        10. CONTATO E ENCARREGADO DE DADOS
                    </Typography>
                    <Typography paragraph sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                        Para questões sobre privacidade, exercício de direitos ou relatório de incidentes, contacte:
                        E-mail: privacy@audakscloud.com | Portal de Privacidade: portal.audakscloud.com/privacy |
                        Encarregado de Proteção de Dados (DPO): dpo@audakscloud.com |
                        Suporte 24/7: suporte@audakscloud.com | Telefone: +55 (11) 4000-0000
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)', flexShrink: 0 }}>
                    <Button onClick={handlePrivacyClose} variant="contained" sx={{ minWidth: 100 }}>
                        Return
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
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
                aria-controls={open ? "language-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="primary"
                sx={{ display: "flex", alignItems: "center" }}
            >
                <img
                    src={`https://flagsapi.com/${currentLanguage.languageTag.toUpperCase().split("-")[0]}/flat/16.png`}
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
                    "aria-labelledby": "language-button",
                }}
            >
                {enabledLanguages.map(({ languageTag, label, href }) => (
                    <MenuItem key={languageTag} onClick={handleClose} component="a" href={href}>
                        <img
                            src={`https://flagsapi.com/${languageTag.toUpperCase().split("-")[0]}/flat/16.png`}
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
