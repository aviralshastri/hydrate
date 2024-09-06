export default async function createAccount(name, password, email, phone, dob,gender) {
  try {
    const response = await fetch('http://127.0.0.1:9000/create_account', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer hydrate:p24zfwqs8eqdxwnun6qvo4y0argm8nzrnfo228tnnscdl4g8zf',
          'JWT': ''
        },
      body: JSON.stringify({ name:name, password:password, email:email, phone_number: phone, dob:dob,gender:gender })
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Authentication failed');
    }

    const data = await response.json();
    console.log('Account created:', data);
    return data.created;
  } catch (error) {
    console.error('Error during account creation:', error);
    return false;
  }
}
