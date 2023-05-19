const router = require("express").Router();
const {
  HomePage,
  refresh_token,
  sendMessage,
  webhook,
  getAccessToken,
} = require("../controllers/mangaController");
router.get("/", HomePage);
router.post("/refresh_Access", refresh_token);
router.post("/send_Message", sendMessage);
router.post("/webhook", webhook);
router.get("/webhookCallBack", getAccessToken);
//using auth router
const authRoute = require("./authRouter");
router.use("/auth", authRoute);

// using author router
const authorRoute = require("./authorRouter");
router.use("/author", authorRoute);

// using user router
const userRoute = require("./userRouter");
router.use("/user", userRoute);

// using admin router
const adminRoute = require("./adminRouter");
router.use("/admin", adminRoute);

// using review manga router
const reviewMangaRoute = require("./reviewMangaRouter");
router.use("/reviewManga", reviewMangaRoute);

// using review chapter router
const reviewChapterRoute = require("./reviewChapterRouter");
router.use("/reviewChapter", reviewChapterRoute);

// using manga Router
const mangaRoute = require("./mangaRouter");
router.use("/manga", mangaRoute);

// using chapter router
const chapterRoute = require("./chapterRouter");
router.use("/chapter", chapterRoute);

//using libary routes
const followRoute = require("./followRouter");
router.use("/follow", followRoute);

//using comment routes
const commentRoute = require("./commentRouter");
router.use("/comment", commentRoute);

// using category routes
const categoryRoute = require("./categoryRouter");
router.use("/category", categoryRoute);

// using history routes
const historyRoute = require("./historyRouter");
router.use("/history", historyRoute);

// using router google
const googleRoute = require("./googleRouter");
router.use("/google", googleRoute);

// using router report
const reportRoute = require("./reportRouter");
router.use("/report", reportRoute);

// using router report commtn
const reportCommentRoute = require("./reportCommentRouter");
router.use("/reportComment", reportCommentRoute);

module.exports = router;
