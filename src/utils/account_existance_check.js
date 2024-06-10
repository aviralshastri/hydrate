export default async function accountExistanceCheck(email,phone_number) {
    try {
      const response = await fetch('http://127.0.0.1:9000/account_existence_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:email, phone_number: phone_number })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Authentication failed');
      }
      const data = await response.json();
      return data.existance;
    } catch (error) {
      console.error('Error during account creation:', error);
      return false;
    }
  }
  