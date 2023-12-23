const express = require("express");
const apiRouter = express.Router();
const minionsRouter = require("../routers/minions/minionsRouter");
const ideasRouter = require("../routers/ideas/ideasRouter");
const meetingsRouter = require("../routers/meetings/meetingsRouter");

// add minionsRouter to apiRouter under the path /minions
apiRouter.use("/minions", minionsRouter);

// add ideasRouter to apiRouter under the path /ideas
apiRouter.use("/ideas", ideasRouter);

// add meetingsRouter to apiRouter under the path /meetings
apiRouter.use("/meetings", meetingsRouter);


module.exports = apiRouter;
