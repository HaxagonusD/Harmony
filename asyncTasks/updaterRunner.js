const updater = require("./updater");
const { Worker, isMainThread, workerData } = require("worker_threads");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_ATLAS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => console.log("Connected to data base in the updater"))
  .catch((error) => console.log(error));
if (isMainThread) {
  console.log("Main tread in updaterunner");
} else {
  setInterval(() => {
    console.log("updating");
    updater();
  }, 2000);
}
