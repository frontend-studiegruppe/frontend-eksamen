//Katinka
//(Dette er en server component!)

// TEST jeg brugte for at checke at params og mappestruktur fungerede:
// export default function DebugParams({ params }) {
//   return <pre>{JSON.stringify(params, null, 2)}</pre>;
// }

import Image from "next/image";
import RelatedArt from "@/components/art_singleview/RelatedArt";
import SingleArtTextContent from "@/components/art_singleview/SingleArtTextContent";

// Opdateret version med hjælp fra chatGPT
export default async function SingleArtwork({ params }) {
  console.log("PARAMS:", params);
  if (!params) {
    return <div>Mangler URL-parametre</div>;
  }

  const { artworkId, eventId } = params;

  if (!artworkId || !eventId) {
    return <div>Ugyldige parametre</div>;
  }

  console.log("artworkId:", artworkId);
  console.log("eventId:", eventId);
  console.log(params);
  const res = await fetch(
    `https://api.smk.dk/api/v1/art?object_number=${artworkId}`
  );
  const data = await res.json();
  const artwork = data.items?.[0];

  if (!artwork) return <div>Kunstværk blev ikke fundet</div>;

  // Få fat i suggested_bg_color (Ikke pænt :P)
  // const backgroundColor = artwork.suggested_bg_color || "#ffffff"; // fallback hvis den mangler

  return (
    <div>
      <Image
        src={artwork.image_thumbnail || "/placeholder.jpg"}
        alt={artwork.title || "Artwork"}
        width={1500}
        height={1000}
        // style={{ backgroundColor }}
      />
      <SingleArtTextContent data={artwork} />
      <RelatedArt artworkId={artworkId} />
    </div>
  );
}
