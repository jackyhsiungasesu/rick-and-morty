import Image from "next/image";

type Character = {
  name: string;
  image: string;
};

export default function Card({ character }: { character: Character }) {
  return (
    <div className="m-1">
      <Image
        alt={character.name}
        src={character.image}
        height={200}
        width={200}
      />
      <p className="w-full text-center">{character.name}</p>
    </div>
  );
}