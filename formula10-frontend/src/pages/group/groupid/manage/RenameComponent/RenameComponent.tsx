import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { checkGroupName, renameGroupDB } from '../../../../../services/group.service';
import { renameGroup } from '../../../../../redux/slices/GroupSlice';
import eventBus from '../../../../../services/eventBus';
import TextInput from '../../../../../components/TextInput/TextInput';
import { GroupDTO } from '../../../../../dto/group.dto';
import { Button } from '@mui/material';

const RenameComponent = ({ group }: { group: GroupDTO}) => {

    const [isRenameActive, setIsRenameActive] = useState(false);
    const [newName, setNewName] = useState('');
    
    const [isNameValid, setIsNameValid] = useState(true);

    const [showErrors, setShowErrors] = useState(false);
    const dispatch = useDispatch();

    const activateRename = () => {
        setIsRenameActive(true);
        setNewName(group.name);
    }

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
                const newGroup = await renameGroupDB(group.id, newName);
                if (newGroup) {
                eventBus.emit('success', { message: 'Group renamed successfully!' });
                dispatch(renameGroup({ groupId: group.id, newName: newName } ));
                }
            } catch (err) {
                throw err;
            }
        }
    };

    return (
        <div className='flex flex-row justify-center'>
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
                    disabled : !isRenameActive
                }}
            />
            <div className='ml-4'>
                {isRenameActive && (
                    <>
                        <Button onClick={() => setIsRenameActive(false)} variant='contained' sx={{mr: '1rem'}}>Cancel</Button>
                        <Button onClick={() => rename()} variant='contained'>Save</Button>
                    </>
                    
                )}
                {!isRenameActive && (
                    <Button onClick={() => activateRename()} variant='contained'>Rename</Button>
                )}
            </div>
        </div>
    )
}

export default RenameComponent