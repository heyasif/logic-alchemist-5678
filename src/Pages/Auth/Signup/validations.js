// validations.js
const validations = (currentUser, users) => {
  let errors = {};

  if (!currentUser.firstName) {
    errors.firstName = "First name is required.";
  }
  if (!currentUser.lastName) {
    errors.lastName = "Last name is required.";
  }
  if (!currentUser.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(currentUser.email)) {
    errors.email = "Email is invalid.";
  } else if (
    Array.isArray(users) &&
    users.some((user) => user.email === currentUser.email)
  ) {
    errors.email = "This email address is already being used!";
  }
  if (!currentUser.password) {
    errors.password = "Password is required.";
  } else if (currentUser.password.length < 8) {
    errors.password = "Password must be more than eight characters.";
  }
  if (!currentUser.passwordConfirm) {
    errors.passwordConfirm = "Confirm password is required.";
  } else if (currentUser.passwordConfirm !== currentUser.password) {
    errors.passwordConfirm = "Passwords do not match.";
  }

  return errors;
};

export default validations;
