const dataMethod = function (request, response, users) {
  const userID = request.cookies["user_id"];
  const email = request.cookies["authentic_email"];
  const password = request.cookies["authentic_password"];


  /*Entered email and password is incorrect, the response reverts to an error.
  Otherwise, evaluates to true and allows user access to account*/

  if (!pass && !email) {
    for (user of users) {
      if (request.body.input === user.email) {
        response.cookie("user_id", user.id);
        response.cookie("authentic_email", true);
        response.send("email exists")
        return;

      }
    }
    response.status(403).send("The email entered is not registered");
  }

  /* Authentic email entered but incorrect password provided, reverts to error.
  Otherwise returns as true and allows user access to account*/
  else if (!pass && email) {
    for (user of users) {
      if (Number(userID) === Number(user.id) && request.body.input === user.password) {
        response.cookie("authentic_password", "true");
        response.send("password correct");
        return;
      }
    }
    response.status(401).send("The password entered is invalid");
  } else {
    response.send({ text: "password correct", name: user.name });
    return;
  }
}

module.exports = { dataMethod };
