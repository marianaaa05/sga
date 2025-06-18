"use client";

import { useState } from "react";

const videos = [
  "https://www.youtube.com/embed/kAbrnfx7axc",
  "https://www.youtube.com/embed/f-ymo7SysiI",
  "https://www.youtube.com/embed/sVRKzSIQgyA",
  "https://www.youtube.com/embed/GmSNHuFs8RA",
  "https://www.youtube.com/embed/1qw5ITr3k9E",
  "https://www.youtube.com/embed/1Y9MC5_ewkU",
  "https://www.youtube.com/embed/5WEcsg5jpDw",
  "https://www.youtube.com/embed/9tjggczw96Q?si=0R2f4xaBupvcc4x4",
  "https://www.youtube.com/embed/iw7x8DUQ2sc?si=al6d32gA6wixqE-8",
];

export default function VideoGrid() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
        ENTREVISTAS
      </h2>

      {/* Grid 3x3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((videoUrl, index) => (
          <div
            key={index}
            className="aspect-video overflow-hidden rounded-lg cursor-pointer border border-white/80 shadow-xl hover:scale-105 transition"
            onClick={() => setSelectedVideo(videoUrl)}
          >
            <iframe
              src={videoUrl}
              title={`video-${index}`}
              className="w-full h-full pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        ))}
      </div>

      {/* Modal expandido */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-4xl aspect-video">
            <iframe
              src={selectedVideo + "?autoplay=1"}
              title={`video-${selectedVideo}`}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded shadow hover:bg-red-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
