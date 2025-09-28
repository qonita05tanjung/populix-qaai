import fs from "fs"

interface Movie {
  title: string;
  genre: string[];
  poster: string;
  description: string;
  release_date: string;
  rating: number;
  link: string;
}

interface MovieResponse {
  result: Movie[];
}

function extractTitlesFromJson(filePath: string): string[] {
  const rawData = fs.readFileSync(filePath, "utf-8");
  const data: MovieResponse = JSON.parse(rawData);

  return data.result.map(movie => movie.title);
}

export default { extractTitlesFromJson }