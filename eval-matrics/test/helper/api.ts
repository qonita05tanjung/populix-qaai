import axios from "axios"
import { promises as fs } from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const auth = async () => {
    console.log("Authenticating...");
  try {
    const res = await axios.post(`${process.env.LOGIN_URL}`, {
      email: process.env.LOGIN_EMAIL,
      password: process.env.LOGIN_PASSWORD,
    });
    return res.data.result.token;
  } catch (err) {
    console.error("Auth error:", err);
    throw err;
  }
};

const get_reccomendation_movies = async (q: string) => {
    console.log("Fetching recommendations for query:", q);
  const token = await auth();
  
  try {
    const res = await axios.post(
      `${process.env.POST_MOVIE_URL}`,
      {
        message: q,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
};

const generate_response_by_title = async (title: string, res: any) => {
    console.log("Generating response for title:", title);
  try {
    const safeTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const fileName = `${safeTitle}.json`;

    const filePath = path.join(process.cwd(), "responses", fileName);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(res, null, 2), "utf-8");

    console.log(`Response saved to ${filePath}`);
    return filePath
  } catch (err) {
    console.error("Error saving response:", err);
  }
};

export default { get_reccomendation_movies, generate_response_by_title }