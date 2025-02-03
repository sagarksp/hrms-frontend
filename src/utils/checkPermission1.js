export const checkPermission = (user, resource) => {
  if (!user || !user.data.role || !user.data) {
    return false;
  }
 const hasAccess = user.data.role.permissions.some(
    (permission) => permission.resources === resource

 )

 return hasAccess
};


