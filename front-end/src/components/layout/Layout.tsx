import Header from "../navigation/Header";
import styles from "./Layout.module.css";

function Layout(props: any) {
  return (
    <>
      <Header />
      <div className={styles["main-container"]}>
        <main className={styles.main}>{props.children}</main>
      </div>
    </>
  );
}

export default Layout;
