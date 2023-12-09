import React, { useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ModalMotion = ({ children }: { children: React.ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const onDismiss = () => {
    router.push("/");
  };
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  return (
    <AnimatePresence>
      <motion.div ref={overlay} className="modal" onClick={handleClick}>
        <button className="absolute top-4 right-8" onClick={onDismiss}>
          <Image src="/close.svg" alt="close" width={17} height={17} />
        </button>
        <motion.div
          ref={wrapper}
          className="modal_wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalMotion;
