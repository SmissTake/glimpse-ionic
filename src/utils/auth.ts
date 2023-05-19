import router from "@/router";
const { VUE_APP_API_URL } = process.env;

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  router.push('/login');
}

export const checkToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  } else {
    try {
      const response = await fetch(`${VUE_APP_API_URL}/user/verify`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}