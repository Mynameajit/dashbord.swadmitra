export const getRedirectPath = (user) => {
  console.log(user, shop);

  if (user.status === "incomplete" ) {
    return "/owner/shop-details";
  }

  if (user?.status === "pending") {
    return "/owner/approval-pending";
  }

  if (user?.status === "approved") {
    return "/owner/dashboard";
  }

  return "/login";
};
