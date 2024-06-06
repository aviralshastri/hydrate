export default async function createAccount(name, password, email, phone, dob) {
  try {
    const response = await fetch('http://192.168.1.9:9000/create_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name:name, password:password, email:email, phone_number: phone, dob })
    });
    console.log(name, password, email, phone, dob);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Authentication failed');
    }

    const data = await response.json();
    console.log(data);
    return data.created;
  } catch (error) {
    console.error('Error during account creation:', error);
    return false;
  }
}
