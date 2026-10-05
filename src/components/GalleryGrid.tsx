"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { galleryCategories, galleryItems } from "@/content/gallery";

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number] | "All">("All");
  const items = useMemo(
    () => (filter === "All" ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <>
      <div className="filters" role="toolbar" aria-label="Gallery categories">
        <button className="filter" type="button" aria-pressed={filter === "All"} onClick={() => setFilter("All")}>
          All
        </button>
        {galleryCategories.map((category) => (
          <button
            key={category}
            className="filter"
            type="button"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {items.map((item) => (
          <figure className="gallery-item" key={item.src}>
            <Image src={item.src} alt={item.alt} width={1200} height={900} sizes="(max-width: 720px) 100vw, 33vw" />
            <figcaption className="quiet">
              {item.category} · {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
