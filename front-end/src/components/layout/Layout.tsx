import { Box } from "@chakra-ui/react";
import Header from "../navigation/Header";
import styles from "./Layout.module.css";
import bg from "@/img/bg.png";

function Layout(props: any) {
  return (
    <>
      <Header />
      {/* <Box backgroundImage={bg.src}> */}
      <div className={styles["main-container"]}>
        <main className={styles.main}>{props.children}</main>
      </div>
      {/* </Box> */}
    </>
  );
}

export default Layout;
