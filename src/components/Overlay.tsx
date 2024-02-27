import { ReactNode } from "react";
import Button from "./Button";

type OverlayProps = {
  children: ReactNode;
  onClose?: () => void;
};

const Overlay = ({ children, onClose }: OverlayProps) => {
  return (
    <div className="fixed bg-black/50 flex flex-col justify-center items-center w-full h-screen top-0 left-0 z-10">
      <div className="flex flex-col gap-8 relative bg-white p-10 rounded-md max-w-[80%] max-h-[80%]">
        {children}
        <Button
          intent="secondary"
          size="small"
          className="absolute right-0 top-0 px-2 m-2 rounded-full hover:scale-125"
          onClick={() => onClose && onClose()}
        >
          x
        </Button>
      </div>
    </div>
  );
};

export default Overlay;
