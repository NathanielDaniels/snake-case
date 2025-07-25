// import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

// export const useKindeBrowserClient = () => {
//   const { user, isAuthenticated } = useKindeAuth();

//   const isUserAuthenticated = () => {
//     return user && isAuthenticated;
//   };

//   return {
//     user,
//     isAuthenticated: isUserAuthenticated,
//   };
// };

import { useKindeBrowserClient as useKinde } from "@kinde-oss/kinde-auth-nextjs";

export const useKindeBrowserClient = () => {
  const { user, isAuthenticated, isLoading } = useKinde();

  const isUserAuthenticated = () => {
    return user && isAuthenticated;
  };

  return {
    user,
    isAuthenticated: isUserAuthenticated,
    isLoading, // Also return loading state
  };
};