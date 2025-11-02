const express = require("express");
const cors = require("cors");
const ConnectToMongoDB = require("./configs/connectdb");
const {port, mongoUrl, dbName} = require("./configs/configenv");
const projectRoutes = require("./routes/project_router");
const experienceRoutes = require("./routes/experience_router")
const skillRoutes = require("./routes/skills_router");
const healthRoutes = require("./routes/health_route");
const statsRoutes = require("./routes/statistics_route");

//initialize express app
const app = express();
app.use(cors({
  origin: [
    "https://resume-app-web-production-41d1.up.railway.app", // ✅ Correct frontend domain
    "http://localhost:5173" // Optional: local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

const PORT = port || 5000; // ✅ Railway will inject its own port
const HOST = "0.0.0.0"; // ✅ Accept external requests

//connect to database
ConnectToMongoDB( mongoUrl , dbName);
// console.log("mongo_port from configenv:", port);  //debugging line



//routes
app.use("/api/projects", projectRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/stats", statsRoutes);


// start server
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});