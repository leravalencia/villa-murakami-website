import Image from "next/image"
import { useState } from "react"

const images = [
  {
    src: "/images/villa-1.jpg",
    alt: "Villa Murakami Exterior",
  },
  {
    src: "/images/villa-2.jpg",
    alt: "Living Room",
  },
  {
    src: "/images/villa-3.jpg",
    alt: "Kitchen",
  },
  {
    src: "/images/villa-4.jpg",
    alt: "Master Bedroom",
  },
  {
    src: "/images/villa-5.jpg",
    alt: "Garden View",
  },
  {
    src: "/images/villa-6.jpg",
    alt: "Pool Area",
  },
]

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="photos" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Property Photos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="Selected property photo"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  )
} 