const express = require("express")
const customRoute = express()

//========= Routes =========//
const firRoute = require("./routes/fir")
const casesRoute = require("./routes/cases")
const loginRoute = require("./routes/login")
const addStaffRoute = require("./routes/createUser")
const messagingRoute = require("./routes/message")
const crimeRoute = require("./routes/crime")
//=========== end ===========//

customRoute.use("/login", loginRoute)
customRoute.use("/fir", firRoute)
customRoute.use("/cases", casesRoute)
customRoute.use("/add", addStaffRoute)
customRoute.use("/message", messagingRoute)
customRoute.use("/crime", crimeRoute)

module.exports = customRoute