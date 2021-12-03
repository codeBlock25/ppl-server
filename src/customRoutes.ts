import express from "express";
const customRoute = express();

//========= Routes =========//
import firRoute from "./routes/fir";
import casesRoute from "./routes/cases";
import loginRoute from "./routes/login";
import addStaffRoute from "./routes/createUser";
import messagingRoute from "./routes/message";
import crimeRoute from "./routes/crime";
//=========== end ===========//

customRoute.use("/login", loginRoute);
customRoute.use("/fir", firRoute);
customRoute.use("/cases", casesRoute);
customRoute.use("/add", addStaffRoute);
customRoute.use("/message", messagingRoute);
customRoute.use("/crime", crimeRoute);

export default customRoute;
