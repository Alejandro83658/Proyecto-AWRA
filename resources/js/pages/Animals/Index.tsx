import React from "react";
import { usePage, Link, router } from '@inertiajs/react';
import type { Animal } from "../../types";
import AwraLayout from '../../layouts/awra-main-layout';

interface Props {
  animals: Animal[];
}

const getImageUrl = (path: string) => {
  if (!path) return '/default.jpg';
  if (path.startsWith('http')) return path;
  if (path.startsWith('storage/')) return `/${path}`;
  if (path.startsWith('animals/')) return `/storage/${path}`;
  return `/${path}`;
};

export default function Index({ animals }: Props) {
  const { auth } = usePage().props as any;

  return (
    <AwraLayout title="Adopta">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Animales en adopción</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {animals.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No hay animales disponibles.</div>
          )}
          {animals.map((animal) => (
            <div key={animal.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
              <img
                src={
                  animal.images?.[0]?.path
                    ? getImageUrl(animal.images[0].path)
                    : '/default.jpg'
                }
                alt={animal.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold text-gray-700">{animal.name}</h2>
              <p className="text-gray-600">{animal.species} - {animal.breed}</p>
              <p className="text-gray-500">{animal.sex} - {animal.size}</p>
              <a
                href={`/adopta/${animal.id}`}
                className="mt-4 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700 transition"
              >
                Ver ficha
              </a>
            </div>
          ))}
        </div>
      </div>
    </AwraLayout>
  );
}