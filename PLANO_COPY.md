# Plano de Implementação da Nova Copy

## 📋 Visão Geral
Este documento mapeia onde cada parte da nova copy será integrada nos componentes existentes.

---

## 1. HERO (Nova Abertura)
**Componente:** `header/header.tsx`

### Copy Atual:
- "Receba agora e transforme seu negócio"
- "Receba capital imediato e transforme recebíveis em crescimento acelerado para seu negócio com segurança total."

### Nova Copy:
```
Transformamos o financeiro da sua empresa em uma estrutura de crescimento.
Não oferecemos apenas crédito.
Estruturamos, operamos e viabilizamos toda a engrenagem financeira para que sua empresa tenha acesso contínuo a capital, previsibilidade de caixa e capacidade real de escalar.
Finance as a Service para empresas que precisam crescer com controle.
```

### Ações:
- [ ] Substituir `heroTitle` (linha 144-154)
- [ ] Substituir `heroDescription` (linha 156-159)
- [ ] Manter botões: "Simular Agora" e "Falar com especialista"
- [ ] Adicionar novo botão "Entender como funciona" (scroll para workflow)

---

## 2. O QUE FAZEMOS
**Componente:** `manifesto/manifesto.tsx` (PRINCIPAL) + `business-features/business-features.tsx` (COMPLEMENTAR)

### Copy Atual (Manifesto):
- "Sua parceira estratégica para crescimento sustentável."
- "Simplificamos a complexidade financeira..."

### Nova Copy:
```
Sua empresa não precisa montar um departamento financeiro complexo, negociar com múltiplas instituições ou estruturar operações sozinha.
Nós assumimos essa arquitetura.
A Tigre Branco atua como uma camada financeira operacional:
```

### Ações no Manifesto:
- [ ] Substituir título (linha 20-23)
- [ ] Substituir parágrafo principal (linha 31-43)
- [ ] Adicionar lista de serviços:
  - Estruturamos o modelo de funding ideal
  - Organizamos os instrumentos financeiros
  - Integramos parceiros financeiros
  - Operamos o fluxo, controle e governança
  - Garantimos previsibilidade e eficiência no capital de giro

### Ações no Business Features:
- [ ] Atualizar badge (linha 29): "INFRAESTRUTURA FINANCEIRA"
- [ ] Atualizar título (linha 31-42): "Você foca no negócio. Nós estruturamos o financeiro para suportar o crescimento."
- [ ] Adicionar subtítulo: "Não somos um banco. Não somos uma securitizadora. Somos a infraestrutura que conecta sua empresa ao capital de forma inteligente."
- [ ] Atualizar cards com os novos benefícios:
  - ✔ Operações de crédito estruturadas
  - ✔ Otimização do fluxo de caixa
  - ✔ Redução de fricção financeira
  - ✔ Escala com governança
  - ✔ Acesso contínuo a liquidez — sem improviso

---

## 3. COMO FUNCIONA
**Componente:** `process-timeline/process-timeline.tsx`

### Copy Atual:
1. "Agende o diagnóstico"
2. "Estruture em 3 dias (ou menos)"
3. "Aporte de capital"
4. "Comece a operar"

### Nova Copy:
```
1. Diagnóstico Estrutural
   Entendemos a operação, o ciclo financeiro e as necessidades reais de capital.

2. Arquitetura Financeira
   Desenhamos o modelo ideal: instrumentos, parceiros, fluxo e governança.

3. Implementação Operacional
   Integramos a estrutura ao dia a dia da empresa sem aumentar sua complexidade interna.

4. Gestão Contínua
   Monitoramos, ajustamos e operamos a engrenagem financeira para sustentar o crescimento.
```

### Ações:
- [ ] Atualizar array `steps` (linhas 10-34)
- [ ] Manter estrutura visual do timeline
- [ ] Atualizar título se necessário: "Como estruturar sua infraestrutura financeira"

---

## 4. PARA QUEM É
**Componente:** `feedback-loop/feedback-loop.tsx` (RENOMEAR/REESTRUTURAR)

### Copy Atual:
- "Soluções de crédito para todos os setores."
- Cards: Indústrias, Comércio e Varejo, Prestadores de Serviços, Agronegócio

### Nova Copy:
```
Empresas que:
- Cresceram mais rápido que sua estrutura financeira
- Precisam de capital, mas não de mais burocracia
- Querem previsibilidade sem montar um time financeiro robusto
- Precisam organizar funding, não apenas captar pontualmente
- Buscam eficiência financeira como vantagem competitiva
```

### Ações:
- [ ] Atualizar título (linha 53): "Para quem é"
- [ ] Substituir subtítulo (linha 54-57)
- [ ] Transformar cards em lista de características (ou manter cards mas com nova copy)
- [ ] Remover progress bars (não fazem sentido com nova copy)

---

## 5. O RESULTADO
**Componente:** Criar nova seção OU adicionar em `manifesto/manifesto.tsx`

### Nova Copy:
```
Um financeiro que deixa de ser reativo
e passa a ser uma plataforma de crescimento.
```

### Ações:
- [ ] Opção A: Adicionar como seção final no Manifesto (antes do footer)
- [ ] Opção B: Criar novo componente `result/result.tsx`
- [ ] Usar destaque visual (destaque para "reativo" → "plataforma de crescimento")

---

## 6. CTA FINAL
**Componente:** `footer/footer.tsx`

### Copy Atual:
- "Vamos começar?"
- "Agende uma conversa com nosso time hoje mesmo!"

### Nova Copy:
```
Sua empresa não precisa "buscar crédito".
Precisa estruturar o acesso ao capital da forma certa.
Vamos construir isso juntos.
```

### Ações:
- [ ] Substituir `h2` (linha 31): "Sua empresa não precisa 'buscar crédito'."
- [ ] Substituir `p` (linha 32): "Precisa estruturar o acesso ao capital da forma certa. Vamos construir isso juntos."
- [ ] Manter botões existentes
- [ ] Alterar label do botão principal para "Agendar conversa" (se necessário)

---

## 7. COMPONENTES QUE NÃO PRECISAM MUDANÇAS
- `navbar/navbar.tsx` - Manter como está
- `workflow/workflow.tsx` - Manter como está (mostra o sistema)
- `faq/faq.tsx` - Manter como está
- `founder/founder.tsx` - Manter como está
- `support/support.tsx` - Manter como está
- `partners/partners.tsx` - Manter como está
- `securitization/securitization.tsx` - Revisar se ainda faz sentido
- `smart-features/smart-features.tsx` - Revisar se ainda faz sentido
- `scout-features/scout-features.tsx` - Revisar se ainda faz sentido

---

## 8. ORDEM DE IMPLEMENTAÇÃO RECOMENDADA

1. **Header** (Hero) - Impacto imediato
2. **Manifesto** (O que fazemos) - Proposta de valor
3. **Process Timeline** (Como funciona) - Processo claro
4. **Business Features** - Detalhamento dos benefícios
5. **Feedback Loop** (Para quem é) - Público-alvo
6. **Resultado** (Nova seção ou adição) - Benefício final
7. **Footer** (CTA Final) - Conversão

---

## 9. NOTAS IMPORTANTES

- Manter tom profissional mas acessível
- Preservar animações e interatividade existentes
- Garantir consistência visual com design atual
- Testar responsividade em todos os breakpoints
- Validar que CTAs direcionam corretamente
- Revisar se componentes como `securitization`, `smart-features` e `scout-features` ainda fazem sentido com a nova proposta de valor

---

## 10. COMPONENTES PARA REVISAR/REMOVER

- `securitization/securitization.tsx` - Pode conflitar com "Não somos uma securitizadora"
- `smart-features/smart-features.tsx` - Verificar se alinha com nova proposta
- `scout-features/scout-features.tsx` - Verificar se alinha com nova proposta


