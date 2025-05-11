import Link from "next/link";
import { ElementType } from "react";
import clsx from 'clsx';

interface TextButtonProps {
  text?: string;
  href?: string;
  icon?: ElementType;
  onClick?: () => void;
  size?: number;
}

export default function TextButton({
  href,
  text,
  onClick,
  icon: Icon,
  size = 14
}: TextButtonProps) {

  const content = (
    <span
      style={{ fontSize: `${size}px` }}
      className={clsx(`
        inline-flex
        items-center
        px-2 py-1
      text-blue-600
        hover:underline
      `,
      )}
    >
      {Icon && <Icon className="mr-1" />}
      {text}
    </span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} className="rounded hover:bg-gray-100">
      {content}
    </button>
  );
}