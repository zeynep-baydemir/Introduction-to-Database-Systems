import app from './app.js';
import { config } from "dotenv";
config();

app.listen(process.env.PORT, () => {
  console.log(`Api is running on port: ${process.env.PORT}`);
});
