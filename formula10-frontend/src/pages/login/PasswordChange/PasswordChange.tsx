import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import PasswordInput from '../../../components/passwordInput/PasswordInput'
import { useTranslation } from 'react-i18next'
import { resetPassword, validateResetToken } from '../../../services/user.service'
import { CharacterValidator, PasswordValidator } from '../../../utils/Validator'
import { useNavigate, useParams } from 'react-router-dom'
import eventBus from '../../../services/eventBus'
import Loading from '../../../components/Loading/Loading'

const PasswordChange = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const { token } = useParams();

  useEffect(() => {
    // Token érvényesség ellenőrzése
    const validateToken = async () => {
      try {
        await validateResetToken(token || '');
        setTokenValid(true);
      } catch {
        setTokenValid(false);
      } finally {
        setLoading(false);
      }
    };
    validateToken();
  }, [token]);

  const handleReset = async () => {
    if (!isPasswordValid || !isConfirmPasswordValid) return;

    try {
      await resetPassword(token || '', password);
      eventBus.emit('success', { message: t('messages.passwordChangeSuccess') });
      navigate('/login');
    } catch {
      eventBus.emit('error', { message: t('messages.passwordChangeError') , isDialog: false });
    }
  };

  if (loading) return <Loading isLoading={loading} />;

  return tokenValid ? (
    <div className='flex flex-col items-center my-8'>
      <div className='p-8 w-full max-w-md'>
        <h2 className='text-2xl mb-6'>{t('passwordChange.passwordChange')}</h2>
        <PasswordInput props={{
          password, setPassword,
          label: 'newPassword',
          validation: [
            { error: password.length === 0, errori18n: 'validation.passwordEmpty' },
            { error: !CharacterValidator(password), errori18n: 'validation.invalidPasswordCharacter' },
            { error: !PasswordValidator(password), errori18n: 'validation.invalidPassword' }
          ],
          isValid: setIsPasswordValid
        }} />
        <PasswordInput props={{
          password: confirmPassword, setPassword: setConfirmPassword,
          label: 'newPasswordAgain',
          validation: [
            { error: password !== confirmPassword, errori18n: 'validation.passwordsDontMatch' }
          ],
          isValid: setIsConfirmPasswordValid
        }} />
        <Button onClick={handleReset}>{t('passwordChange.change')}</Button>
      </div>
    </div>
  ) : (
    <div className='text-center mt-20 text-red-600'>
      {t('messages.errorLoadingUserFromEmail')}
    </div>
  );
};

export default PasswordChange