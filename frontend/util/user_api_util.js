export const fetchUsers = () => {
  return $.ajax({
    method: "GET",
    url: "api/users"
  });
};

export const editProfile = (formData) => {
  return $.ajax({
    url: `api/users/${currentUser.id}`,
    method: "PATCH",
    dataType: "json",
    contentType: false,
    processData: false,
    data: formData
  });
};
