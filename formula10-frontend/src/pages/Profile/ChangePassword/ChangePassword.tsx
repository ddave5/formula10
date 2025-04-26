import { Button, Card, CardContent, CardHeader } from '@mui/material'
import { t } from 'i18next'
import React, { useState } from 'react'
import { IoIosLock } from 'react-icons/io'
import PasswordInput from '../../../components/passwordInput/PasswordInput'
import { useTheme } from '../../../layout/navbar/Theme/ThemeContext'
import { changePasswordForUser, checkOldPassword } from '../../../services/user.service'
import { CharacterValidator, PasswordValidator } from '../../../utils/Validator'
import eventBus from '../../../services/eventBus'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../redux/Store'

const ChangePassword = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordErrors, setShowPasswordErrors] = useState(false);
    const {theme} = useTheme();

    
    const validatePassword = async () => {

    const isValidOldPassword = await checkOldPassword(oldPassword, user?.id || 0);
    const isValid = (
        isValidOldPassword &&
        CharacterValidator(newPassword) && PasswordValidator(newPassword) &&
        !(newPassword !== confirmPassword || confirmPassword === "")
    );
    return isValid;
    };

    const changePassword = async () => {
        setShowPasswordErrors(true);

        const isValid = await validatePassword();
        
        if (isValid) {
            const response = await changePasswordForUser(user?.email || '', newPassword);

            if (response) {
                eventBus.emit('success', { message: t('messages.successUserPasswordChange') });
            }
        }
    }

    return (
        <Card className="mb-8 dark:bg-gray-800 dark:text-white">
            <CardHeader
            className="flex items-center"
            avatar={<IoIosLock />}
            title={t('profile.passwordTitle')}
            sx={{".MuiCardHeader-subheader": {color: theme === 'dark' ? 'var(--color-text)' : 'bg-gray-800'}}}
            subheader={t('profile.subTitle')}/>
            <CardContent sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <PasswordInput props={{
                password: oldPassword,
                setPassword: setOldPassword,
                label:'oldPassword'
                }}
            />
            <PasswordInput props={{
                password: newPassword,
                setPassword: setNewPassword,
                label:'password',
                validation: [
                    {error: newPassword.length === 0, errori18n: 'validation.passwordEmpty'},
                    {error: !CharacterValidator(newPassword), errori18n: 'validation.invalidPasswordCharacter'},
                    {error: !PasswordValidator(newPassword), errori18n: 'validation.invalidPassword'}
                ],
                showError: showPasswordErrors,
                }}
            />
            <PasswordInput props={{
                password: confirmPassword,
                setPassword: setConfirmPassword, 
                label: 'passwordAgain',
                validation: [
                    {error: (newPassword !== confirmPassword || confirmPassword === ""), errori18n: 'validation.passwordsDontMatch'}
                ],
                showError: showPasswordErrors
                }}
            />
            <Button onClick={changePassword} variant='contained'>
                {t('profile.updatePassword')}
            </Button>
            </CardContent>
        </Card>
    )
}

export default ChangePassword