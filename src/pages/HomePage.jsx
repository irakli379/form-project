import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.ribbon}>Welcome to Our Platform!</div>
      <div className={styles.contentCard}>
        <h1 className={styles.welcomeText}>HomePage</h1>
        <p className={styles.description}>
          Discover a world of amazing content. Dive in and explore everything we
          offer.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
