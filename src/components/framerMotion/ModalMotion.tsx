import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDom from "react-dom";
import state from "../../store";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
};

const ModalMotion = ({ children, isOpen }: Props) => {
  const onDismiss = () => {
    state.projectModalForm = false;
  };

  const handleClick = () => {};

  const modalRoot = useRef(document.getElementById("modal"));
  const modalRef = useRef(document.createElement("div")); // Inicializa com um elemento vazio

  return ReactDom.createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div className="modal" onClick={handleClick}>
          <button className="absolute top-4 right-8" onClick={onDismiss}>
            <img src="/close.svg" alt="close" width={17} height={17} />
          </button>
          <motion.div
            className="modal_wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    modalRoot.current || modalRef.current
  );
};

export default ModalMotion;
