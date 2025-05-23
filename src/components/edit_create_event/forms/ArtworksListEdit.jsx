"use client";
import Image from "next/image";
import { IoCheckmark } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";
import Button from "@/components/Button";
import FilterBtn from "../FilterBtn";
import { motion } from "motion/react";
import { useArtworksLogic } from "@/utils/artworksLogic";

const ArtworkListEdit = ({ blurred = false, selectedArtworks, setSelectedArtworks, selectedDate }) => {
  const {
    displayedArtworks,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedArtists,
    selectedTechniques,
    selectedMaterials,
    handleSelectArtist,
    handleSelectTechnique,
    handleSelectMaterial,
    toggleSelect,
    selectedArtworksPage,
    setSelectedArtworksPage,
    selectedTotalPages,
    displayedSelectedArtworks,
    handleClearFilters,
    handleSearchResult,
    MAX_SELECTION,
    isArtworkBooked,
    artists,
    techniques,
    materials,
    artworks,
  } = useArtworksLogic(selectedDate, selectedArtworks, setSelectedArtworks);

  return (
    <div
      className={`flex flex-col sm:flex-row gap-2 p-4 bg-white rounded
        max-w-[800px] max-h-[450px] overflow-hidden
        min-w-[320px]
        ${blurred ? "filter blur-sm pointer-events-none select-none" : ""}`}
    >
      {/* Venstre kolonne - Kunstværker */}
      <div className="flex-1 max-w-[600px] overflow-y-auto pr-4">
        <h5 className="font-semibold mb-1">Vælg op til {MAX_SELECTION} værker:</h5>
        <p className="text-sm mb-3">Du kan vælge {MAX_SELECTION - selectedArtworks.length} værker mere</p>

        {/* Filter */}
        <FilterBtn
          artists={artists}
          techniques={techniques}
          materials={materials}
          selectedArtists={selectedArtists}
          selectedTechniques={selectedTechniques}
          selectedMaterials={selectedMaterials}
          onSelectArtist={handleSelectArtist}
          onSelectTechnique={handleSelectTechnique}
          onSelectMaterial={handleSelectMaterial}
          onClearFilters={handleClearFilters}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3">
          {displayedArtworks.length === 0 && <p>Ingen billeder fundet</p>}

          {displayedArtworks.map((artwork) => {
            const isSelected = selectedArtworks.includes(artwork.id);
            const isBooked = isArtworkBooked(artwork.id);
            const imageUrl = artwork.image_thumbnail || "/dummy4.jpg";
            const title = artwork.titles?.[0]?.title || "Uden titel";

            return (
              <div key={artwork.id} className="max-w-[100px]">
                <div
                  onClick={() => toggleSelect(artwork.id)}
                  className="relative cursor-pointer group rounded overflow-hidden"
                >
                  {isSelected && (
                    <div className="absolute inset-0 z-10 bg-black/60 rounded pointer-events-none flex justify-end items-start">
                      <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center border-2 border-primary-red">
                        <IoCheckmark className="text-primary-red text-sm" />
                      </div>
                    </div>
                  )}
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={100}
                    height={100}
                    className="rounded object-cover"
                  />

                  {isBooked && (
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center text-white font-bold text-center text-sm rounded">
                      Booket
                    </div>
                  )}
                </div>
                <p className="truncate mt-1 !text-sm">{title}</p>
              </div>
            );
          })}
        </div>

        {/* Pagination venstre */}
        <div className="flex justify-center mt-3 gap-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className={`px-2 py-1 mb-5 border rounded
                ${currentPage === i + 1
                  ? "bg-primary-red text-white border-primary-red"
                  : "border-primary-red text-primary-red hover:bg-primary-red hover:border-primary-red hover:text-white"
                }`}
            >
              {i + 1}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Højre kolonne - Valgte værker */}
      <div className="w-1/2 sm:w-[300px] overflow-y-auto max-h-[600px]">
        <h5 className="mb-2">
          Valgte værker ({selectedArtworks.length} / {MAX_SELECTION})
        </h5>

        {selectedArtworks.length === 0 && <p>Ingen valgte værker endnu</p>}

        <motion.div className="grid grid-cols-3 gap-2">
          {displayedSelectedArtworks.map((id) => {
            const artwork = artworks.find((a) => a.id === id);

            if (!artwork) return null;

            const imageUrl = artwork.image_thumbnail || "/dummy4.jpg";
            const title = artwork.titles?.[0]?.title || "Uden titel";

            return (
              <div
                key={id}
                className="relative text-sm cursor-pointer"
                onClick={() => toggleSelect(id)}
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  width={100}
                  height={100}
                  className="rounded object-cover"
                />
                <LuTrash2 className="absolute right-1 top-1 text-lg text-secondary" />
                <p className="truncate mt-1 text-xs">{title}</p>
              </div>
            );
          })}
        </motion.div>

        {selectedTotalPages > 1 && (
          <div className="flex justify-center gap-2 my-4">
            {Array.from({ length: selectedTotalPages }, (_, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedArtworksPage(i + 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className={`px-2 py-1 mb-2 border rounded
                  ${selectedArtworksPage === i + 1
                    ? "bg-primary-red text-white border-primary-red"
                    : "border-primary-red text-primary-red hover:bg-primary-red hover:border-primary-red hover:text-white"
                  }`}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-4">
          {selectedArtworks.length > 0 && (
            <Button
              onClick={() => {
                setSelectedArtworks([]);
                setSelectedArtworksPage(1);
              }}
              variant="transparent_w_icon"
            >
              <LuTrash2 />
              Ryd valg
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkListEdit;
