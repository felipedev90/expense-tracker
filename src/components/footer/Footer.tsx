import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.developerInfo}>
          <p>Desenvolvido por Felipe Augusto</p>
        </div>
        <div className={styles.socialLinks}>
          <div className={styles.followText}>
            <span>Me siga nas redes sociais:</span>
          </div>
          <div>
            <div className={styles.linkContainer}>
              <div className={styles.linkA}>
                <a
                  href="https://www.linkedin.com/in/felipesilva90/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  LinkedIn
                </a>
              </div>
              <div className={styles.linkB}>
                <a
                  href="http://www.github.com/felipedev90"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
