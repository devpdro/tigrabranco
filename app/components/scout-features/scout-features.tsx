import { Check, DollarSign, Zap } from "lucide-react";
import S from "./scout-features.module.scss";

export function Scout() {
  return (
    <div className={S.cashbackSection}>
      {/* Coluna Visual (Esquerda) */}
      <div className={S.visualColumn}>
        <div className={S.visualStack}>
          {/* Card Topo */}
          <div className={S.topCard}>
            <div className={S.iconBox}>
              <Zap size={14} color="#7c3aed" />
            </div>
            <span className={S.brandName}>Scout Tigra</span>
          </div>

          <div className={S.connectorLine} />

          {/* Lista de Transações */}
          <div className={S.transactionList}>
            <div className={S.transactionItem}>
              <div className={S.checkIcon}>
                <Check size={10} />
              </div>
              <span className={S.transName}>META0524</span>
              <span className={S.transValue}>+$24,50</span>
            </div>
            <div className={S.transactionItem}>
              <div className={S.checkIcon}>
                <Check size={10} />
              </div>
              <span className={S.transName}>Oferta Peq. Empresas</span>
              <span className={S.transValue}>+$150,00</span>
            </div>
          </div>

          <div className={S.connectorLine} />

          {/* Badge de Economia */}
          <div className={S.savingsBadge}>
            <Check size={16} />
            <span>Você economizou +$174,50</span>
          </div>

          <div className={S.connectorLine} />

          {/* Card Principal (Meta) */}
          <div className={S.mainCard}>
            <div className={S.metaLogo}>
              {/* Ícone infinito simples representando Meta */}
              <svg viewBox="0 0 24 24" width="32" height="32" fill="#0064e0">
                <path d="M12 5.177C9.566 5.177 8.356 6.55 7.15 8.358 6.13 9.888 5.257 11.198 3.5 11.198c-1.4 0-2.327-.925-2.327-2.322 0-1.28.986-2.292 2.192-2.292.568 0 .942.215 1.15.35l.89-1.576c-.306-.217-.893-.574-1.996-.574C1.35 4.784 0 6.603 0 8.876c0 2.455 1.762 4.124 3.69 4.124 2.322 0 3.535-1.396 4.755-3.23 1.01-1.516 1.87-2.808 3.555-2.808 1.45 0 2.378.96 2.378 2.393 0 1.25-.97 2.22-2.096 2.22-.57 0-.965-.216-1.185-.356l-.883 1.58c.3.21.905.576 2.02.576 2.13 0 3.666-1.782 3.666-4.02 0-2.545-1.755-4.178-3.9-4.178z" />
              </svg>
            </div>
            <div className={S.cardValues}>
              <span className={S.oldValue}>-$480,56</span>
              <span className={S.newValue}>-$306,06</span>
            </div>
            <p className={S.cardLabel}>Gastos com anúncios Meta</p>
          </div>
        </div>
      </div>

      {/* Coluna Conteúdo (Direita) */}
      <div className={S.contentColumn}>
        <div className={S.iconWrapper}>
          <DollarSign size={24} />
        </div>
        <h2 className={S.title}>Aproveite dinheiro grátis</h2>
        <p className={S.description}>
          Deixe o Scout™ fazer a sua magia e veja o seu cashback aumentar 🤑
        </p>
      </div>
    </div>
  );
}
