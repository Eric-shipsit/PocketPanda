import Link from "next/link";
import { ElementType } from "react";
import clsx from 'clsx';

interface TextButtonProps {
  text?: string;
  href?: string;
  icon?: ElementType;
  onClick?: () => void;
  size?: number;
  color?: string;
}

export default function TextButton({
  href,
  text,
  onClick,
  icon: Icon,
  size = 14,
  color = "blue"
}: TextButtonProps) {

  const content = (
    <span
      style={{ fontSize: `${size}px`, color: `${color}`}}
      className={clsx(`
        inline-flex
        items-center
        hover:underline
      `,
      )}
    >
      {Icon && <Icon size={size}/>}
      {text}
    </span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} className="rounded hover:bg-gray-100 cursor-pointer">
      {content}
    </button>
  );
}