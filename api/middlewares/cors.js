import cors from "cors";

// Предоставляем доступ cors
export default cors({
  credentials: true,
  origin: ["http://localhost:3000"],
  exposedHeaders: "*",
});
