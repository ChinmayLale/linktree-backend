import { Link } from "@prisma/client";
import { LinkItem } from "../types/misc.types"; // Your frontend types

export const mapLinkToLinkItem = (link: Link): LinkItem => {
   return {
      id: link.id,
      type: link.type, // matches enum values
      title: link.title,
      url: link.url,
      icon: link.icon ?? undefined,
      color: link.color,
      active: link.active,
      style: link.style,
      thumbnail: link.thumbnail ?? undefined,
      clicks: link.clicks ?? undefined,
      duration: link.duration ?? undefined,
      images: link.images && link.images.length > 0 ? link.images : undefined,
      metadata: link.metadata ? (link.metadata as Record<string, unknown>) : undefined,
      status: link.status === "PUBLISHED",
   };
};
