import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Photo({ src, alt, caption, className, sizes, priority }: Props) {
  return (
    <figure className={`media ${className ?? ""}`.trim()}>
      <Image src={src} alt={alt} fill sizes={sizes ?? "(max-width: 720px) 100vw, 50vw"} priority={priority} />
      {caption ? <figcaption className="caption">{caption}</figcaption> : null}
    </figure>
  );
}
