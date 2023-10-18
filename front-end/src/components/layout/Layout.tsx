import Header from "../navigation/Header";
import styles from "./Layout.module.css";

function Layout(props: any) {
  return (
    <div>
      <Header />

      <div className={styles["main-container"]}>
        <main className={styles.main}>{props.children}</main>
      </div>
    </div>
  );
}

export default Layout;
