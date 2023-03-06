function QueryToObj(req){

    const userObj = {
      "webUserId": req.query.webUserId ||= "",
      "userEmail": req.query.userEmail ||= "",
      "firstName": req.query.firstName ||= "",
      "lastName": req.query.lastName ||= "",
      "userPassword": req.query.userPassword ||= "",
      "userPassword2": req.query.userPassword2 ||= "",
      "image": req.query.image ||= "",
      "birthday": req.query.birthday ||= "",
      "membershipFee": req.query.membershipFee ||= "",
      "roomNumber": req.query.roomNumber ||= "",
      "userRoleId": req.query.userRoleId ||= "",
    }

  return userObj
}

module.exports = QueryToObj;