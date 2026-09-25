import "dotenv/config";
import app from "./src/app";
import connectDB from "./src/config/database";
import { startScheduler } from "./src/utils/scheduler";

const PORT = parseInt(process.env.PORT ?? "5000", 10);

connectDB().then(() => {
  startScheduler();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
