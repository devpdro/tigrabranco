"use client";

import { Navbar } from "@/app/components";
import styles from "./termos.module.scss";

export default function Termos() {
  return (
    <>
      <Navbar forceScrolled />
      <div className={styles.container}>
        <div className={styles.badge}>Atualizado em março de 2025</div>
        <h1 className={styles.title}>TERMOS DE USO E SERVIÇO — PLATAFORMA TIGRE BRANCO PAY</h1>

        <div className={styles.content}>
          <p>
            A Tigre Branco Securitizadora S.A. (&quot;Tigre Branco&quot;, &quot;nós&quot; ou &quot;nos&quot;) é a empresa responsável pela operação da plataforma Tigre Branco Pay — solução de infraestrutura tecnológica financeira (Finance as a Service — FaaS) que disponibiliza, para empresas, fintechs, correspondentes bancários e demais parceiros institucionais, serviços como securitização de recebíveis, intermediação de operações de crédito, gestão de pagamentos, análise de risco e rotinas de conformidade regulatória, por meio de APIs e ambiente web seguro.
          </p>

          <p>
            Estes Termos de Uso e Serviço (&quot;Termos&quot;) regulam o acesso e a utilização do site https://tigrebranco.com.br e da Plataforma Tigre Branco Pay, estabelecendo os direitos e obrigações entre você (&quot;Usuário&quot;, &quot;Parceiro&quot; ou &quot;Cliente&quot;) e a Tigre Branco. Ao acessar o site ou contratar nossos serviços, você declara ter lido, compreendido e concordado integralmente com estes Termos. Caso não concorde, o acesso e uso da Plataforma não são autorizados.
          </p>

          <p>
            Estes Termos devem ser lidos em conjunto com nossa Política de Privacidade (disponível em: https://tigrebranco.com.br/politica-privacidade). A Tigre Branco reserva-se o direito de revisar estes Termos periodicamente, sendo as alterações publicadas nesta página com indicação da data de atualização.
          </p>

          <p className={styles.alert}>
            LEIA ESTES TERMOS NA ÍNTEGRA ANTES DE UTILIZAR A PLATAFORMA.{" "}
            Este documento contém disposições relevantes sobre elegibilidade, responsabilidades, limitações de garantia, proteção de dados, propriedade intelectual e resolução de controvérsias, cujo conhecimento é condição para a contratação e uso dos serviços.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>1. Definições</h2>

          <p>Para fins destes Termos, as expressões abaixo possuem os seguintes significados:</p>
          <ul>
            <li>Plataforma: o ambiente digital (web e API) operado pela Tigre Branco que possibilita a estruturação, gestão e operacionalização de produtos e serviços financeiros;</li>
            <li>Serviços: todas as funcionalidades disponibilizadas pela Plataforma, incluindo securitização, crédito, pagamentos, análise de risco e compliance;</li>
            <li>Parceiros Financeiros: instituições financeiras, de pagamento ou assemelhadas, devidamente autorizadas e reguladas, que formalizam e liquidam as operações intermediadas pela Plataforma;</li>
            <li>Conta: credencial de acesso à Plataforma, vinculada a uma pessoa jurídica regularmente constituída no Brasil;</li>
            <li>Administrador: representante legal ou operacional do Cliente com poderes para gerenciar a Conta;</li>
            <li>Usuário: qualquer pessoa física autorizada pelo Administrador a operar na Plataforma em nome do Cliente.</li>
          </ul>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>2. Acesso e Elegibilidade</h2>

          <h3>2.1. Requisitos de Elegibilidade</h3>
          <p>
            O acesso à Plataforma é restrito a pessoas jurídicas regularmente constituídas e registradas no Brasil, com CNPJ ativo e em situação regular perante os órgãos competentes. Não é permitido o uso por pessoas físicas na qualidade de consumidores finais, tampouco por empresas organizadas fora do território nacional. O uso da Plataforma deve observar, a qualquer tempo, a legislação brasileira vigente, incluindo normas do Banco Central do Brasil, da CVM e da LGPD.
          </p>

          <h3>2.2. Abertura de Conta</h3>
          <p>
            A abertura de Conta exige o fornecimento de informações corporativas e documentais completas e verídicas, incluindo dados cadastrais da empresa, estrutura societária, identificação dos representantes legais e beneficiários finais, comprovantes de regularidade jurídica e demais documentos solicitados durante o processo de onboarding. A Tigre Branco reserva-se o direito de recusar solicitações de abertura de Conta ou de encerrar Contas existentes em caso de informações incompletas, inconsistentes ou suspeita de uso indevido.
          </p>

          <h3>2.3. Segurança e Responsabilidade de Acesso</h3>
          <p>
            O Cliente é integralmente responsável pela confidencialidade de suas credenciais de acesso e por todas as ações realizadas em sua Conta, incluindo as executadas por Administradores e Usuários autorizados. Qualquer suspeita de acesso não autorizado deve ser comunicada imediatamente à Tigre Branco. A Tigre Branco não se responsabilizará por perdas ou danos decorrentes do uso indevido de credenciais por terceiros.
          </p>

          <h3>2.4. Remuneração e Taxas</h3>
          <p>
            A utilização de determinados Serviços está sujeita ao pagamento de taxas de acesso, mensalidades, taxas por transação ou por uso de funcionalidades específicas, conforme informado no momento da contratação ou por meio da Plataforma. A Tigre Branco poderá revisar os valores mediante comunicação prévia de 30 (trinta) dias.
          </p>

          <h3>2.5. Natureza dos Serviços</h3>
          <p>
            A Tigre Branco disponibiliza infraestrutura tecnológica e operacional, não atuando como instituição financeira perante os clientes finais dos Parceiros que utilizam a Plataforma. As operações de crédito, securitização e pagamento são formalizadas e liquidadas pelos Parceiros Financeiros, que são os responsáveis legais pela análise, aprovação, definição de condições e execução das operações reguladas.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>3. Propriedade Intelectual</h2>

          <p>
            Todos os elementos que compõem a Plataforma e os Serviços — incluindo código-fonte, interfaces, algoritmos, marcas, logotipos, documentação técnica, metodologias e conteúdo editorial — são de propriedade exclusiva da Tigre Branco ou de seus licenciadores, protegidos pela legislação de propriedade intelectual brasileira e por tratados internacionais. É concedida ao Cliente uma licença de uso limitada, não exclusiva, intransferível e revogável, pelo período de vigência da relação contratual, exclusivamente para os fins previstos nestes Termos. Qualquer uso fora desse escopo, incluindo reprodução, engenharia reversa, sublicenciamento ou distribuição, é expressamente vedado.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>4. Tratamento de Dados e Privacidade</h2>

          <p>
            O uso da Plataforma implica a coleta, tratamento e armazenamento de dados corporativos e pessoais, conforme descrito em nossa Política de Privacidade. Ao aceitar estes Termos, o Cliente autoriza a Tigre Branco a processar tais informações para fins de prestação dos Serviços, cumprimento de obrigações legais e regulatórias, análise de risco e melhoria contínua da Plataforma. O tratamento de dados observa rigorosamente os princípios e disposições da LGPD (Lei nº 13.709/2018). A Tigre Branco poderá agregar dados anonimizados para fins analíticos e de desenvolvimento de produto, sem identificação individual.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>5. Conteúdo de Terceiros e Integrações</h2>

          <p>
            A Plataforma pode conter links, integrações ou referências a serviços e plataformas de terceiros. A Tigre Branco não assume qualquer responsabilidade pelo conteúdo, disponibilidade, segurança ou práticas de privacidade de tais serviços externos. O acesso a plataformas de terceiros é realizado por conta e risco do Usuário, não sendo cobertos por estes Termos nem pela Política de Privacidade da Tigre Branco.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>6. Declarações, Garantias e Responsabilidades do Cliente</h2>

          <h3>6.1. Declarações do Cliente</h3>
          <p>
            Ao utilizar a Plataforma, o Cliente declara e garante que:
          </p>
          <ul>
            <li>É pessoa jurídica regularmente constituída no Brasil, com CNPJ válido e situação cadastral ativa;</li>
            <li>Possui plena capacidade jurídica para celebrar este acordo e cumprir as obrigações aqui previstas;</li>
            <li>Todas as informações fornecidas à Tigre Branco são verdadeiras, completas e atualizadas;</li>
            <li>Utilizará a Plataforma exclusivamente para finalidades empresariais lícitas, em conformidade com a legislação vigente;</li>
            <li>Não utilizará os Serviços para fins de lavagem de dinheiro, financiamento ao terrorismo, evasão fiscal ou qualquer atividade ilícita;</li>
            <li>Detém todas as autorizações, licenças e registros necessários para operar no segmento de sua atuação;</li>
            <li>Revisou e concorda integralmente com estes Termos e com a Política de Privacidade da Tigre Branco.</li>
          </ul>

          <h3>6.2. Indenização</h3>
          <p>
            O Cliente compromete-se a defender, indenizar e manter indene a Tigre Branco, suas subsidiárias, administradores, colaboradores e Parceiros Financeiros, de quaisquer perdas, danos, responsabilidades, custos e despesas (incluindo honorários advocatícios razoáveis) decorrentes de: (a) violação destes Termos ou da legislação aplicável; (b) uso indevido da Plataforma ou dos Serviços; (c) violação de direitos de terceiros; (d) informações falsas, incompletas ou desatualizadas fornecidas à Tigre Branco; ou (e) ações ou omissões dolosas ou culposas do Cliente, seus Administradores ou Usuários.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>7. Isenção de Garantias</h2>

          <p>
            Os Serviços são disponibilizados &quot;no estado em que se encontram&quot; e &quot;conforme disponibilidade&quot;. A Tigre Branco não oferece garantias expressas ou implícitas de adequação a uma finalidade específica, ausência de erros, disponibilidade ininterrupta ou resultados financeiros determinados. O desempenho da Plataforma pode ser afetado por fatores externos, incluindo infraestrutura de terceiros, condições regulatórias e eventos de força maior, pelos quais a Tigre Branco não se responsabiliza.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>8. Limitação de Responsabilidade</h2>

          <p>
            Na extensão máxima permitida pela legislação brasileira aplicável, a Tigre Branco não será responsabilizada por danos indiretos, lucros cessantes, perda de dados, danos reputacionais ou qualquer prejuízo decorrente do uso ou da impossibilidade de uso da Plataforma, ainda que tenha sido alertada sobre a possibilidade de tais danos. A responsabilidade total da Tigre Branco, em qualquer hipótese, ficará limitada aos valores efetivamente pagos pelo Cliente nos 12 (doze) meses anteriores ao evento gerador do dano.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>9. Vigência e Rescisão</h2>

          <p>
            Estes Termos vigoram a partir do primeiro acesso à Plataforma e permanecem em vigor enquanto a relação contratual estiver ativa. O Cliente pode encerrar sua Conta a qualquer momento, mediante notificação formal à Tigre Branco, desde que não haja pendências financeiras ou operacionais. A Tigre Branco pode suspender ou encerrar o acesso do Cliente, a qualquer tempo, em caso de violação destes Termos, uso indevido da Plataforma, suspeita de atividade ilícita ou por determinação regulatória, com ou sem aviso prévio, conforme a gravidade da situação. O encerramento da Conta não extingue obrigações contraídas durante o período de uso, incluindo pagamentos pendentes e responsabilidades por danos causados.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>10. Alterações nos Termos</h2>

          <p>
            A Tigre Branco poderá revisar estes Termos periodicamente para refletir mudanças regulatórias, operacionais ou de produto. As alterações serão comunicadas com antecedência mínima de 10 (dez) dias por meio do site ou por e-mail cadastrado. A continuidade do uso da Plataforma após a publicação das alterações será interpretada como aceite tácito das novas condições.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>11. Disposições Gerais</h2>

          <h3>11.1. Integridade do Acordo</h3>
          <p>
            Estes Termos, em conjunto com a Política de Privacidade e eventuais contratos específicos celebrados entre as partes, constituem o acordo integral que rege a relação entre o Cliente e a Tigre Branco, prevalecendo sobre quaisquer entendimentos anteriores, verbais ou escritos, sobre o mesmo objeto.
          </p>

          <h3>11.2. Cessão</h3>
          <p>
            O Cliente não poderá ceder, transferir ou sub-rogar, total ou parcialmente, os direitos e obrigações decorrentes destes Termos sem prévia anuência escrita da Tigre Branco. A Tigre Branco poderá ceder seus direitos e obrigações no contexto de operações societárias, reestruturações ou transferências de ativos, mediante notificação ao Cliente.
          </p>

          <h3>11.3. Comunicações</h3>
          <p>
            Todas as comunicações formais entre as partes serão realizadas por meio do e-mail cadastrado na Conta ou pelos canais oficiais da Tigre Branco. Notificações enviadas por e-mail presumem-se recebidas no primeiro dia útil subsequente ao envio.
          </p>

          <h3>11.4. Independência das Cláusulas</h3>
          <p>
            A nulidade ou inaplicabilidade de qualquer disposição destes Termos não afetará a validade e eficácia das demais, que permanecerão em pleno vigor.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>12. Lei Aplicável e Foro</h2>

          <p>
            Estes Termos são regidos pelas leis da República Federativa do Brasil, com especial observância da Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018), da Resolução CVM nº 60/2021, da Lei nº 14.430/2022 (Securitização), da Lei nº 12.865/2013 (Pagamentos) e demais normas do Banco Central do Brasil e da CVM aplicáveis. Fica eleito o foro da Comarca de São Paulo, Estado de São Paulo, para dirimir quaisquer controvérsias decorrentes destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
          </p>

          <div className={styles.divider}>
            <div className={styles.dividerSymbol}></div>
          </div>
          <h2>13. Contato</h2>

          <p>
            Para dúvidas, solicitações ou notificações relacionadas a estes Termos, entre em contato com a Tigre Branco pelos canais abaixo:
          </p>
          <ul>
            <li>E-mail jurídico: <a href="mailto:juridico@tigrebranco.com.br">juridico@tigrebranco.com.br</a></li>
            <li>E-mail geral: <a href="mailto:contato@tigrebranco.com.br">contato@tigrebranco.com.br</a></li>
            <li>Site: https://tigrebranco.com.br</li>
          </ul>

          <p className={styles.footer}>
            Ao utilizar a Plataforma Tigre Branco Pay, você confirma que leu, compreendeu e aceita integralmente estes Termos de Uso e Serviço.
          </p>
        </div>
      </div>
    </>
  );
}
