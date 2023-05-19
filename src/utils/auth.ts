import router from "@/router";
const { VUE_APP_API_URL } = process.env;

export const logout = () => {
  localStorage.removeItem('token');
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
      console.log(data);
      if (response.status === 200) {
        console.log('valid token');
        return true;
      } else {
        console.error("invalid token");
        return false;
      }
    } catch (error) {
      console.error("invalid token");
      return false;
    }
  }
}