function DbToObj(db_user){
    const userObj =
  {
    "webUserId": db_user.web_user_id,
    "userEmail": db_user.user_email,
    "firstName": db_user.first_name,
    "lastName": db_user.last_name,
    "userPassword": db_user.user_password,
    "userPassword2": db_user.user_password,
    "image": db_user.image,
    "birthday": db_user.birthday,
    "membershipFee": db_user.membership_fee,
    "roomNumber": db_user.room_number,
    "userRoleId": db_user.user_role_id,
    "roleType": db_user.role_type,
  }

  return userObj
}

export default DbToObj;