export async function sendEmailVerification(otp, email){
  try {
    const response = await fetch('http://127.0.0.1:9000/email_verification', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer hydrate:p24zfwqs8eqdxwnun6qvo4y0argm8nzrnfo228tnnscdl4g8zf',
          'JWT': ''
        },
      body: JSON.stringify({ otp:otp ,email:email })
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Authentication failed');
    }

    const data = await response.json();

    return data.status;
  } catch (error) {
    console.error('Error while sending OTP.', error);
    return false;
  }
}

export async function SendMobileVerification(username, password) {
  return true;
}
