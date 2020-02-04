const express = require("express")
const customRoute = express()

//========= Routes =========//
const firRoute = require("./routes/fir")
const casesRoute = require("./routes/cases")
const loginRoute = require("./routes/login")
const addStaffRoute = require("./routes/createUser")
//=========== end ===========//

customRoute.use("/login", loginRoute)
customRoute.use("/fir", firRoute)
customRoute.use("/cases", casesRoute)
customRoute.use("/add", addStaffRoute)

module.exports = customRoute