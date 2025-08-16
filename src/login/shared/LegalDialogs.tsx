import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { I18n } from '../i18n';

interface LegalDialogProps {
    open: boolean;
    onClose: () => void;
    i18n: I18n;
    type: 'terms' | 'privacy';
}

export function LegalDialog({ open, onClose, i18n, type }: LegalDialogProps) {
    const { msg } = i18n;

    const getTitle = () => {
        return type === 'terms' ? msg("termsAndConditions") : msg("privacyPolicy");
    };

    const getContent = () => {
        if (type === 'terms') {
            return (
                <>
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
                </>
            );
        } else {
            return (
                <>
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
                        Podemos atualizar esta Política periodicamente para refletir mudanças em nossas práticas, serviços ou
                        requisitos legais. Notificaremos sobre alterações significativas através de email, notificações na
                        plataforma ou comunicação direta com antecedência mínima de 30 dias. O uso continuado dos serviços
                        após as alterações constituirá aceitação da política atualizada.
                    </Typography>
                </>
            );
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
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
                    {getTitle()}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
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
                {getContent()}
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)', flexShrink: 0 }}>
                <Button onClick={onClose} variant="contained" sx={{ minWidth: 100 }}>
                    {msg("closeButton")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// Hook để quản lý state và handlers cho legal dialogs
export function useLegalDialogs() {
    const [termsOpen, setTermsOpen] = React.useState(false);
    const [privacyOpen, setPrivacyOpen] = React.useState(false);

    const handleOpenTerms = () => setTermsOpen(true);
    const handleCloseTerms = () => setTermsOpen(false);
    const handleOpenPrivacy = () => setPrivacyOpen(true);
    const handleClosePrivacy = () => setPrivacyOpen(false);

    return {
        termsOpen,
        privacyOpen,
        handleOpenTerms,
        handleCloseTerms,
        handleOpenPrivacy,
        handleClosePrivacy,
    };
}
