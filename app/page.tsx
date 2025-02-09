import styles from "./page.module.css";
import LoginPage from "@/components/pages/Login";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
     <LoginPage/>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
