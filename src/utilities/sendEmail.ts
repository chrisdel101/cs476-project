interface EmailParams {
    message?: string,
    email: string,
    from_name: string,
    reply_to?: string
}
declare global {
    interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      emailjs?: any;
    }
  }
export const sendEmail = (templateId: string, params: EmailParams) => {
  window.emailjs
    .send('service_e4fgffq', templateId, params)
    .then(() => {
      console.log('Email successfully sent!')
    })
    // Handle errors here however you like, or use a React error boundary
    .catch((err: Error) =>
      console.error(
        'Oh well, you failed. Here some thoughts on the error that occured:',
        err
      )
    )
}