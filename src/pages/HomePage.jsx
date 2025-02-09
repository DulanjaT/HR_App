import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <main>
        <div className={styles["home-page"]}>
          <header className="welcome-banner">
            <h1>Welcome to Our HR Management Platform</h1>
          </header>

          <section className={styles["dashboard-section"]}>
            <div className={styles["dashboard-card"]}>
              <h2>Workforce Overview</h2>
              <p>17</p>
            </div>
            <div className={styles["dashboard-card"]}>
              <h2>Departments</h2>
              <p>5</p>
            </div>
            <div className={styles["dashboard-card"]}>
              <h2>Pending Feedback</h2>
              <p>3</p>
            </div>
            <div className={styles["dashboard-card"]}>
              <h2>New Hires</h2>
              <p>2</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default HomePage;
