import state from "../store";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
  index: number;
  count: number;
};

const ProjetCard = ({
  id,
  image,
  title,
  name,
  avatarUrl,
  userId,
  index,
  count,
}: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, translate: 0 }}
        transition={{ duration: 1, delay: count * 0.3 }}
        exit={{ opacity: 0, scale: 0 }}
        className="flexCenter flex-col rounded-2xl drop-shadow-card"
      >
        <button
          onClick={() => {
            (state.activeProject = index), (state.projectModal = true);
          }}
          className="flexCenter group relative w-full h-full"
        >
          <img
            src={image}
            width={414}
            height={314}
            className="w-full h-full object-cover rounded-2xl"
            alt="project image"
          />

          <div className="hidden group-hover:flex profile_card-title">
            <p className="w-full">{title}</p>
          </div>
        </button>
        <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
          <button>
            <div className="flexCenter gap-2">
              <img
                src={avatarUrl}
                width={24}
                height={24}
                className="rounded-full"
                alt="profile image"
              />
              <p>{name}</p>
            </div>
          </button>
          <div className="flexCenter gap-3 ">
            <div className="flexCenter gap-2">
              <img src="/hearth.svg" width={18} height={18} alt="heart" />
              <p className="text-sm">200</p>
            </div>
            <div className="flexCenter gap-2">
              <img src="/eye.svg" width={18} height={18} alt="eye" />
              <p className="text-sm">5.2k</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjetCard;
