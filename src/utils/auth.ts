import router from "@/router";

export const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
}