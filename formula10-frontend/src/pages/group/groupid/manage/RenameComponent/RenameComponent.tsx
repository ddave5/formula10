import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { checkGroupName, renameGroupDB } from '../../../../../services/group.service';
import { renameGroup } from '../../../../../redux/slices/GroupSlice';
import eventBus from '../../../../../services/eventBus';
import TextInput from '../../../../../components/TextInput/TextInput';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useGroup } from '../../../../../context/GroupContext';
import { t } from 'i18next';

const RenameComponent = ({ open, onClose }: { open: boolean; onClose: () => void }) => {

    const { group, setGroup } = useGroup();
    const [newName, setNewName] = useState(group?.name || '');
    
    const [isNameValid, setIsNameValid] = useState(true);

    const [showErrors, setShowErrors] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
          setNewName(group?.name || '');
        }
    }, [open, group?.name]);

    const checkName = async (name: string) => {
        if (name.trim()) {
        const isAvailable = await checkGroupName(name);
        return isAvailable;
        } else {
        return true;
        }
    };

    const validateNameForm = async () => {
        const nameValid = await checkName(newName);
        const isValid = (
            nameValid && 
            !(newName.length > 50 || newName.length < 3) 
        );
        return isValid;
    };

    const rename = async () => {

        setShowErrors(true);
        const isValid = await validateNameForm();

        if (isValid) {
            try {
                const newGroup = await renameGroupDB(group?.id || 0, newName);
                if (newGroup) {
                    eventBus.emit('success', { message: t('manageGroup.successMessage') });
                    setGroup({
                        ...(group || { id: 0, name: '', members: [], availability: 'PUBLIC' }),
                        name: newGroup.name
                    });
                    dispatch(renameGroup({ groupId: group?.id || 0, newName: newName } ));
                    onClose();
                }
            } catch (err) {
                throw err;
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} sx={{'.css-10d30g3-MuiPaper-root-MuiDialog-paper': {width: '100%'}}}>
            <DialogTitle>{t('manageGroup.renameGroup')}</DialogTitle>
            <DialogContent sx={{minHeight: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput props = 
                    {{
                        id : 'newName',
                        isRequired: true,
                        i18n: 'manageGroup.newName',
                        type: 'text',
                        variant: 'outlined',
                        value: newName,
                        setValue: setNewName,
                        validation: [
                            {error: newName.length === 0, errori18n: 'manageGroup.nameEmpty'}, 
                            {error: (newName.length > 50 || newName.length < 5), errori18n: 'manageGroup.nameLength'},
                            {error: !isNameValid, errori18n: 'manageGroup.nameAlreadyTaken'}
                        ],
                        isValid: setIsNameValid,
                        showError: showErrors,
                        sx:{width: '100%'}
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='primary'>
                    Cancel
                </Button>
                <Button onClick={rename} color='primary' variant='contained'>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RenameComponent