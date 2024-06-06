export default async function login(username, password) {
  try {
      const response = await fetch(`http://192.168.1.9:9000/verify_account`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: username, password: password })
      });

      if (!response.ok) {
          throw new Error('Authentication failed');
      }

      const data = await response.json();
      return data.verified;
  } catch (error) {
      console.error('Error during authentication:', error);
      return false; 
  }
}



