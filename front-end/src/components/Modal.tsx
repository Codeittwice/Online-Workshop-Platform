import { useRef, useEffect, useState, ReactNode } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

interface PortalProps {
  children: ReactNode;
}

const Backdrop = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

//const portalElement = document.getElementById("overlays");

const Modal = (props: any) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  let portal: HTMLElement | null =
    document.querySelector<HTMLElement>("#overlays");

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#overlays");
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && ref.current
        ? ReactDOM.createPortal(
            <Backdrop onClose={props.onClose} />,
            ref.current
          )
        : null}
      {mounted && ref.current
        ? ReactDOM.createPortal(
            <ModalOverlay>{props.children}</ModalOverlay>,
            ref.current
          )
        : null}
    </>
  );
};

export default Modal;
