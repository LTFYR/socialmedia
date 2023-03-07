const validator = ({
  fullname,
  username,
  email,
  password,
  confirm_password,
}) => {
  const error = {};
  if (!fullname) {
    error.fullname = "You must add your fullname, dear user";
  } else if (fullname.length > 30) {
    error.fullname = "Only 30 characters allowed for fullname";
  }

  if (!username) {
    error.username = "You must add your fullname, dear user";
  } else if (username.replace(/ /g, "").length > 30) {
    error.username = "Only 30 characters allowed for username";
  }

  if (!email) {
    error.email = "You must add your email, dear user";
  } else if (!validateEmail(email)) {
    error.email = "Invalid email format added";
  }

  if (!password) {
    error.password = "You must add your password, dear user";
  } else if (password.length < 6) {
    error.password = "At least 6 characters required for password";
  }

  if (password !== confirm_password) {
    error.confirm_password =
      "Confirm password is not matching with your password";
  }

  return {
    errorMessage: error,
    errorLength: Object.keys(error).length,
  };
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default validator;
