export default async function accountExistanceCheck(email,phone_number) {
    try {
      const response = await fetch('http://127.0.0.1:9000/account_existence_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer hydrate:p24zfwqs8eqdxwnun6qvo4y0argm8nzrnfo228tnnscdl4g8zf',
          'JWT': ''
        },
        body: JSON.stringify({email:email, phone_number: phone_number })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Authentication failed');
      }
      const data = await response.json();
      return data.existance;xx
    } catch (error) {
      console.error('Error during account creation:', error);
      return false;
    }
  }
  