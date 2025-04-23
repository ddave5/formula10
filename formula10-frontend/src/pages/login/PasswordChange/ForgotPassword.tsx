import { Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { EmailValidator } from "../../../utils/Validator";
import { sendResetEmail } from "../../../services/user.service";
import eventBus from "../../../services/eventBus";
import TextInput from "../../../components/TextInput/TextInput";

const ForgotPassword = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
  
    const navigate = useNavigate();
  
    const handleSendEmail = async () => {
      if (!EmailValidator(email)) {
        setIsEmailValid(false);
        return;
      }
  
      try {
        await sendResetEmail(email);
        eventBus.emit('success', { message: t('messages.successEmailSent') });
        navigate('/');
      } catch {
        eventBus.emit('error', { message: t('messages.emailSendingFailed'), isDialog: false });
      }
    };
  
    return (
      <div className='flex flex-col items-center my-8'>
        <div className='p-8 w-full max-w-md'>
          <h2 className='text-2xl mb-4'>{t('forgotPassword.title')}</h2>
          <p className='mb-6'>{t('forgotPassword.instructions')}</p>
          <TextInput props={{
            id: 'email',
            isRequired: true,
            type: 'text',
            i18n: 'registration.email',
            value: email,
            variant: 'outlined',
            setValue: setEmail,
            validation: [
              { error: email.length === 0, errori18n: 'validation.emailEmpty' },
              { error: !EmailValidator(email), errori18n: 'validation.invalidEmail' }
            ],
            isValid: setIsEmailValid
          }} />
          <Button onClick={handleSendEmail}>{t('forgotPassword.send')}</Button>
        </div>
      </div>
    );
  };

  export default ForgotPassword