"use client";

import { Navbar } from "@/app/components";
import styles from "./politica-privacidade.module.scss";

export default function PoliticaPrivacidade() {
  return (
    <>
      <Navbar forceScrolled />
      <div className={styles.container}>
        <div className={styles.badge}>Atualizado em março de 2025</div>
        <h1 className={styles.title}>POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS — TIGRE BRANCO PAY</h1>

        <div className={styles.content}>
          <p>
            A Tigre Branco Securitizadora S.A. (&quot;Tigre Branco&quot;, &quot;nós&quot; ou &quot;nos&quot;) opera a plataforma Tigre Branco Pay — solução de infraestrutura tecnológica financeira (Finance as a Service — FaaS) voltada a empresas, fintechs, correspondentes bancários e investidores que atuam no mercado de crédito e securitização. Esta Política de Privacidade e Proteção de Dados (&quot;Política&quot;) descreve de forma transparente como coletamos, utilizamos, armazenamos, compartilhamos e protegemos dados corporativos e pessoais quando você acessa o site https://tigrebranco.com.br ou utiliza nossa Plataforma.
          </p>

          <p>
            Esta Política está em plena conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018) e demais normas aplicáveis ao setor financeiro e tecnológico. Ao acessar o site ou contratar nossos serviços, você declara ter lido e concordado com as práticas aqui descritas. Recomendamos a leitura periódica desta Política, cujas atualizações serão publicadas nesta página com indicação da data de revisão.
          </p>

          <p className={styles.alert}>
            LEIA ESTA POLÍTICA NA ÍNTEGRA. Ela descreve como seus dados são tratados, com quem podem ser compartilhados, quais são seus direitos como titular e como exercê-los. O uso da Plataforma implica aceite destas condições.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>1. Quem é o Controlador dos Dados</h2>

          <p>
            O controlador responsável pelo tratamento dos dados pessoais e corporativos coletados por meio do site e da Plataforma é a Tigre Branco Securitizadora S.A., inscrita no CNPJ sob o nº [CNPJ], com sede em [endereço completo], São Paulo — SP. Para contato direto com a área responsável pelo tratamento de dados, utilize o canal: <a href="mailto:privacidade@tigrebranco.com.br">privacidade@tigrebranco.com.br</a>.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>2. Dados que Coletamos</h2>

          <h3>2.1. Dados Corporativos</h3>
          <p>
            Para abertura de Conta e operação na Plataforma, coletamos informações sobre a pessoa jurídica, incluindo:
          </p>
          <ul>
            <li>Razão social, nome fantasia, CNPJ e inscrições estaduais ou municipais;</li>
            <li>Endereço comercial e dados de contato institucional;</li>
            <li>Estrutura societária, quadro de sócios e beneficiários finais;</li>
            <li>Documentos de constituição, certidões de regularidade e comprovantes de registro;</li>
            <li>Informações financeiras e operacionais relevantes para avaliação de risco e onboarding regulatório;</li>
            <li>Dados sobre carteiras de crédito, recebíveis e operações de securitização.</li>
          </ul>

          <h3>2.2. Dados Pessoais de Representantes e Usuários</h3>
          <p>
            Coletamos dados pessoais dos Administradores, Usuários autorizados e beneficiários finais, incluindo:
          </p>
          <ul>
            <li>Nome completo, data de nascimento, CPF e demais documentos de identificação;</li>
            <li>Endereço residencial e comprovante de residência;</li>
            <li>Dados de contato (e-mail, telefone);</li>
            <li>Informações bancárias, quando necessário para operações específicas;</li>
            <li>Registros de acesso à Plataforma (credenciais, logs, sessões, endereço IP).</li>
          </ul>

          <h3>2.3. Dados de Uso e Navegação</h3>
          <p>
            Coletamos automaticamente dados técnicos sobre a interação com o site e a Plataforma, incluindo:
          </p>
          <ul>
            <li>Endereço IP, tipo e versão de navegador, sistema operacional e dispositivo;</li>
            <li>Páginas visitadas, tempo de sessão e fluxos de navegação;</li>
            <li>Logs de transações, consultas e operações realizadas na Plataforma;</li>
            <li>Cookies, pixels e tecnologias similares de rastreamento de sessão e comportamento.</li>
          </ul>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>3. Finalidades e Bases Legais do Tratamento</h2>

          <p>
            Tratamos os dados coletados com fundamento nas bases legais previstas na LGPD, para as seguintes finalidades:
          </p>
          <ul>
            <li>
              Prestação e operação dos Serviços (execução contratual): Processamento de cadastros, avaliação de elegibilidade, operacionalização de funcionalidades da Plataforma (crédito, securitização, pagamentos, compliance) e suporte técnico e operacional;
            </li>
            <li>
              Prevenção a fraudes e segurança (legítimo interesse e obrigação legal): Verificação de identidade, análise de risco operacional e creditício, prevenção à lavagem de dinheiro (PLD/FT) e a outros crimes financeiros, em conformidade com a regulamentação do BACEN e COAF;
            </li>
            <li>
              Cumprimento de obrigações legais e regulatórias (obrigação legal): Reporte às autoridades competentes (BACEN, CVM, Receita Federal, COAF), conservação de registros pelo prazo legal, e adequação às normas do setor financeiro e de capitais;
            </li>
            <li>
              Comunicação institucional (legítimo interesse ou consentimento): Envio de notificações operacionais, alertas de segurança, informações sobre atualizações da Plataforma e comunicações comerciais relevantes;
            </li>
            <li>
              Análise e melhoria de produto (legítimo interesse): Avaliação de padrões de uso, desenvolvimento de novas funcionalidades e aprimoramento da experiência na Plataforma, com base em dados anonimizados ou agregados.
            </li>
          </ul>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>4. Compartilhamento de Dados</h2>

          <p>
            Os dados tratados pela Tigre Branco poderão ser compartilhados com terceiros nas seguintes hipóteses:
          </p>
          <ul>
            <li>
              Parceiros Financeiros: Bancos, securitizadoras, fundos de investimento em direitos creditórios (FIDCs), instituições de pagamento e demais entidades autorizadas e reguladas, responsáveis pela formalização, estruturação e liquidação das operações intermediadas pela Plataforma;
            </li>
            <li>
              Provedores de Serviços e Suboperadores: Empresas contratadas para suporte tecnológico, processamento de pagamentos, análise de crédito, segurança da informação e serviços de infraestrutura em nuvem, vinculados por cláusulas contratuais de confidencialidade e proteção de dados;
            </li>
            <li>
              Autoridades Públicas e Reguladoras: Banco Central do Brasil, CVM, COAF, Receita Federal e demais órgãos competentes, quando exigido por lei, regulamento, decisão judicial ou administrativa;
            </li>
            <li>
              Bureaus de Crédito e Prevenção a Fraudes: Serviços especializados em verificação de identidade, análise de risco e PLD/FT, para fins de conformidade e segurança operacional;
            </li>
            <li>
              Sucessores e Adquirentes: Em operações de fusão, cisão, incorporação, venda de ativos ou reestruturação societária, os dados poderão ser transferidos ao adquirente, que assumirá as obrigações desta Política;
            </li>
            <li>
              Com consentimento do titular: Em situações específicas não contempladas acima, mediante autorização expressa do titular dos dados.
            </li>
          </ul>

          <p>
            A Tigre Branco não comercializa dados pessoais com terceiros para fins de marketing ou publicidade.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>5. Segurança da Informação</h2>

          <p>
            A Tigre Branco adota padrões rigorosos de segurança da informação para proteger os dados tratados contra acessos não autorizados, vazamentos, alterações indevidas e destruição, incluindo:
          </p>
          <ul>
            <li>Criptografia de dados em trânsito (TLS) e em repouso (AES-256);</li>
            <li>Autenticação multifator (MFA) e controle de acesso baseado em perfis e privilégios mínimos;</li>
            <li>Monitoramento contínuo de segurança, detecção de intrusões e resposta a incidentes;</li>
            <li>Auditorias periódicas de segurança e testes de vulnerabilidade;</li>
            <li>Treinamentos regulares da equipe em proteção de dados e boas práticas de segurança;</li>
            <li>Planos de continuidade de negócios e recuperação de desastres.</li>
          </ul>

          <p>
            Em caso de incidente de segurança que possa causar risco ou dano aos titulares, a Tigre Branco comunicará a ocorrência à Autoridade Nacional de Proteção de Dados (ANPD) e, quando necessário, aos titulares afetados, nos termos da LGPD.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>6. Seus Direitos como Titular</h2>

          <p>
            Nos termos da LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
          </p>
          <ul>
            <li>Confirmação e acesso: Saber se tratamos seus dados e acessar uma cópia dos dados que possuímos sobre você;</li>
            <li>Correção: Solicitar a atualização ou retificação de dados incompletos, inexatos ou desatualizados;</li>
            <li>Anonimização, bloqueio ou eliminação: Requerer a anonimização, o bloqueio ou a exclusão de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD;</li>
            <li>Portabilidade: Solicitar a portabilidade dos seus dados para outro fornecedor de serviço ou produto, observadas as regulamentações aplicáveis;</li>
            <li>Revogação do consentimento: Retirar o consentimento dado para tratamentos baseados nessa base legal, a qualquer momento, sem prejuízo da licitude dos tratamentos realizados anteriormente;</li>
            <li>Oposição: Se opor ao tratamento realizado com base em legítimo interesse, quando não houver justificativa adequada;</li>
            <li>Informação sobre compartilhamentos: Obter informações sobre as entidades públicas e privadas com as quais compartilhamos seus dados;</li>
            <li>Revisão de decisões automatizadas: Solicitar a revisão de decisões tomadas com base exclusivamente em tratamento automatizado de dados.</li>
          </ul>

          <p>
            Para exercer seus direitos, entre em contato com o nosso Encarregado de Proteção de Dados (DPO) pelo e-mail <a href="mailto:privacidade@tigrebranco.com.br">privacidade@tigrebranco.com.br</a>. Responderemos sua solicitação no prazo de até 15 (quinze) dias corridos.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>7. Retenção e Descarte de Dados</h2>

          <p>
            Os dados pessoais e corporativos são retidos pelo período necessário ao cumprimento das finalidades descritas nesta Política, respeitando os prazos mínimos exigidos pela legislação aplicável. Para operações financeiras e registros contábeis, a retenção pode se estender por até 10 (dez) anos, conforme obrigações do setor financeiro. Após o término do prazo de retenção, os dados serão excluídos de forma segura ou anonimizados de modo irreversível.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>8. Cookies e Tecnologias de Rastreamento</h2>

          <p>
            Utilizamos cookies próprios e de terceiros para fins de funcionamento do site, análise de desempenho, personalização de conteúdo e segurança. Os cookies podem ser classificados como essenciais (necessários para o funcionamento básico), analíticos (dados de navegação anonimizados) e de funcionalidade (preferências do usuário). Você pode gerenciar e desabilitar cookies por meio das configurações do seu navegador. A desativação de cookies essenciais pode comprometer o funcionamento de algumas funcionalidades do site.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>9. Transferência Internacional de Dados</h2>

          <p>
            Alguns de nossos provedores de infraestrutura tecnológica estão sediados fora do Brasil, o que pode implicar a transferência de dados para servidores localizados no exterior. Nessas situações, a Tigre Branco adota as salvaguardas exigidas pela LGPD, incluindo cláusulas contratuais específicas de proteção de dados e verificação de que os países de destino oferecem nível de proteção adequado ou equivalente ao previsto na legislação brasileira.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>10. Serviços Exclusivamente B2B</h2>

          <p>
            A Plataforma Tigre Branco Pay é destinada exclusivamente a pessoas jurídicas que atuam no mercado financeiro, de crédito ou tecnologia. Não coletamos intencionalmente dados pessoais de menores de 18 anos. Caso identifiquemos a coleta inadvertida de dados de menores, tomaremos as medidas necessárias para exclusão imediata dessas informações.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>11. Atualizações desta Política</h2>

          <p>
            Esta Política poderá ser atualizada periodicamente para refletir mudanças regulatórias, operacionais ou de produto. Alterações relevantes serão comunicadas por meio do site ou do e-mail cadastrado, com indicação da data de revisão no topo desta página. Recomendamos a consulta periódica deste documento.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>12. Encarregado de Dados (DPO) e Contato</h2>

          <p>
            Para dúvidas, solicitações ou exercício de direitos relacionados a esta Política ou ao tratamento de seus dados, entre em contato com nossa equipe responsável:
          </p>
          <ul>
            <li>Encarregado de Proteção de Dados (DPO): <a href="mailto:privacidade@tigrebranco.com.br">privacidade@tigrebranco.com.br</a></li>
            <li>E-mail geral: <a href="mailto:contato@tigrebranco.com.br">contato@tigrebranco.com.br</a></li>
            <li>Site: https://tigrebranco.com.br</li>
          </ul>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>13. Lei Aplicável</h2>

          <p>
            Esta Política é regida pelas leis da República Federativa do Brasil, com especial observância da LGPD (Lei nº 13.709/2018), da Lei nº 14.430/2022, das Resoluções do BACEN e da CVM aplicáveis, e das normas do COAF. Eventuais controvérsias serão submetidas ao foro da Comarca de São Paulo, Estado de São Paulo.
          </p>

          <p className={styles.footer}>
            Ao utilizar a Plataforma Tigre Branco Pay, você confirma que leu, compreendeu e concorda com os termos desta Política de Privacidade e Proteção de Dados.
          </p>
        </div>
      </div>
    </>
  );
}
