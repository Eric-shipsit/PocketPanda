import TextButton from "@/app/components/buttons/TextButton";
import { PropsWithChildren } from "react";
import { ChevronRight } from "lucide-react";

interface SlideInDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  direction?: string;
  height?: string;
  width?: string;
  layer?: string;
}

export default function SlideInDrawer({
  isOpen,
  onClose,
  direction = "right",
  height = "h-full",
  width = "w-full",
  layer = "z-10",
  children,
}: PropsWithChildren<SlideInDrawerProps>) {
  let directionOpen;
  let directionClose;
  let drawerStyle;
  switch (direction) {
    case "right":
      drawerStyle = "top-0 bottom-0 right-0";
      directionOpen = "translate-x-0";
      directionClose = "translate-x-full";
      break;
    case "left":
      drawerStyle = "top-0 left-0 bottom-0";
      directionOpen = "translate-x-0";
      directionClose = "-translate-x-full";
      break;
    case "bottom":
      drawerStyle = "right-0 left-0 bottom-0";
      directionOpen = "translate-y-0";
      directionClose = "translate-y-full";
      break;
    default:
      drawerStyle = "right-0 left-0 top-0";
      directionOpen = "translate-y-0";
      directionClose = "-translate-y-full";
      break;
  }
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${layer} w-full h-full`}
    >
      <div
        className={`
          absolute inset-0 bg-black
          transition-opacity duration-300
          ${isOpen ? "opacity-80 pointer-events-auto" : "opacity-0"}
        `}
        onClick={onClose}
      />
      <div
        className={`
          absolute ${drawerStyle}
          ${width} ${height}
          bg-white
          transform transition-transform duration-300
          ${isOpen ? directionOpen : directionClose}
          pointer-events-auto flex flex-col
        `}
      >
        <div className="flex justify-start p-4 ">
          <TextButton
            text="Go back"
            icon={ChevronRight}
            onClick={onClose}
            size={20}
            color="gray"
          />
        </div>
        <div className="overflow-auto p-4 h-full">{children}</div>
      </div>
    </div>
  );
}
