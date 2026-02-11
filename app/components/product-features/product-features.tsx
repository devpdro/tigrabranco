"use client";

import {
  Bot,
  Share2,
  ShieldCheck,
  Monitor,
  MessageCircle,
  Package,
  ChevronRight,
} from "lucide-react";
import styles from "./product-features.module.scss";

export function Product() {
  const features = [
    {
      icon: Bot,
      iconColor: "#7c3aed", // Purple
      iconBg: "#f3e8ff",
      title: "GitHub Copilot",
      description:
        "Get started for free with up to 2,000 completions and 50 chat requests per month.",
      cta: "Compare plans",
    },
    {
      icon: Share2,
      iconColor: "#16a34a", // Green
      iconBg: "#dcfce7",
      title: "GitHub Models",
      description:
        "Bring industry-leading AI into your workflow, securely, scalably, and with full developer control.",
      cta: "Learn more",
      badge: "New",
    },
    {
      icon: ShieldCheck,
      iconColor: "#2563eb", // Blue
      iconBg: "#dbeafe",
      title: "GitHub Advanced Security",
      description:
        "Gain peace of mind with our security, privacy, and responsible AI policies.",
      cta: "Learn more",
    },
    {
      icon: Monitor,
      iconColor: "#db2777", // Pink
      iconBg: "#fce7f3",
      title: "GitHub Codespaces",
      description:
        "Starting at $0.18 per hour of compute and $0.07 per GB of storage.",
      cta: "Learn more",
    },
    {
      icon: MessageCircle,
      iconColor: "#ea580c", // Orange
      iconBg: "#ffedd5",
      title: "Premium support",
      description:
        "Get expert help for Enterprise Cloud and Enterprise—any hour your team needs it.",
      cta: "Learn more",
    },
    {
      icon: Package,
      iconColor: "#ca8a04", // Yellow
      iconBg: "#fef9c3",
      title: "Git Large File Storage",
      description:
        "$5 per month for 50 GB bandwidth and 50 GB of storage.",
      cta: "Learn more",
    },
  ];

  return (
    <section className={styles["product-features"]}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={styles.card}>
                <div className={styles.header}>
                  <div
                    className={styles["icon-wrapper"]}
                    style={{
                      backgroundColor: feature.iconBg,
                      color: feature.iconColor,
                    }}
                  >
                    <Icon strokeWidth={1.5} />
                  </div>
                  {feature.badge && (
                    <span className={styles["badge-new"]}>{feature.badge}</span>
                  )}
                </div>
                <div className={styles.content}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <a href="#" className={styles["cta-link"]}>
                  {feature.cta} <ChevronRight />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
