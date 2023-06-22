"use client";

import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import Card from "@/components/Card";

type Character = {
  name: string;
  image: string;
};

type State = Character[] | [];

export default function Home() {
  const [characters, setCharacters] = useState<State>([]);
  const [curPage, setCurPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  function fetchCharacters(page = 1) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const newCharacters = data.results.map((character: Character) => ({
          name: character.name,
          image: character.image,
        }));
        setCharacters(newCharacters);
        if (data.info.pages !== pageCount) {
          setPageCount(data.info.pages);
        }
      });
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  const onPageChange = (event: any, page: number) => {
    setCurPage(page);
    fetchCharacters(page);
  }

  const cards = characters.map((character) => <Card character={character} />);
  return (
    <main>
      <h1 className="font-bold text-center">Rick and Morty Characters</h1>
      <div className="flex flex-wrap">{cards}</div>
      <div className="flex justify-center m-2">
        <Pagination count={pageCount} page={curPage} shape="rounded" onChange={onPageChange}/>
      </div>
    </main>
  );
}
