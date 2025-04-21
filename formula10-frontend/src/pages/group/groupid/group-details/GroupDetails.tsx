import React, { useEffect, useState } from 'react'
import { Avatar, Card, CardContent, CardHeader, Chip } from '@mui/material';
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { getGroupMembersTipExist } from '../../../../services/tip.service';
import eventBus from '../../../../services/eventBus';
import { useGroup } from '../../../../context/GroupContext';
import { useLocation } from 'react-router-dom';
import Loading from '../../../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../layout/navbar/Theme/ThemeContext';

const GroupDetails = () => {

  const {t} = useTranslation();

  const { group } = useGroup();
  const [loading, setLoading] = useState<boolean>(true);

  const {theme} = useTheme();

  const [driverSelections, setDriverSelections] = useState<Record<string, boolean>>({});

  const location = useLocation();
  useEffect(() => {
    const getGroupMembers = async () => {
      try {
        const groupTips = await getGroupMembersTipExist(group?.id || +(location.pathname.split('/')[2]));

        setDriverSelections(groupTips);

        if (!groupTips) {
          eventBus.emit('error', {message: t('messages.errorFetching'), isDialog: true});
          return;
        }
        
      } catch (error) {
        eventBus.emit('error', {message: t('messages.errorFetching'), isDialog: true});
      } finally {
        setLoading(false);
      }
    };

    getGroupMembers();
  }, [group?.id, location.pathname, t]);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  // Get the counts for selected and not selected
  const selectedCount = Object.values(driverSelections).filter(Boolean).length
  const notSelectedCount = Object.keys(driverSelections).length - selectedCount

  return (
    <div className="w-full max-w-3xl mx-auto mt-4">
      <Card className="border-2 border-red-600/20 dark:border-red-800/30 shadow-lg">
        <CardHeader 
          className="bg-gradient-to-r from-red-600/10 to-red-600/5 dark:from-red-900/20 dark:to-red-900/10" 
          title={t('groupDetails.title')}
          subheader={t('groupDetails.description')}> 
        </CardHeader>
        <CardContent sx={{backgroundColor: theme === 'dark' ? '#6a7282' : '#ffffff'}}>
          <div className="flex gap-2 my-2">
            <Chip 
              variant="outlined" 
              sx={{
                backgroundColor: theme === 'dark' ? '#124116' : '#e8f5e9', 
                borderColor: theme === 'dark' ? '#205723' : '#a5d6a7', 
                color: theme === 'dark' ? '#47824a' : '#388e3c'
              }}
              label={`${t('groupDetails.selected')}: ${selectedCount}`} />
            <Chip 
              variant="outlined" 
              sx={{
                backgroundColor: theme === 'dark' ? '#801313' : '#ffebee', 
                borderColor: theme === 'dark' ? '#8a1c1c' : '#ef9a9a', 
                color: theme === 'dark' ? '#a73a38' : '#d32f2f'
              }}
              label={`${t('groupDetails.notSelected')}: ${notSelectedCount}`} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 ">
            {Object.entries(driverSelections).map(([username, hasSelected]) => (
              <Card
                key={username}
                className={`overflow-hidden transition-all ${hasSelected ? "border-green-200" : "border-red-200"} `}
              >
                <div className={`h-2 ${hasSelected ? "bg-green-500 dark:bg-green-700" : "bg-red-500 dark:bg-red-700"}`} />
                <CardContent className={`p-4 dark:bg-gray-500 border-2 border-solid ${hasSelected ? "border-green-500 dark:border-green-700" : "border-red-500 dark:border-red-700"}`}>
                  <div className="flex items-center gap-4 ">
                    <Avatar className={`h-10 w-10 ${hasSelected ? "bg-green-100 dark:bg-green-900/50" : "bg-red-100 dark:bg-red-900/50"}`}>
                      {username.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="flex-1 ">
                      <p className="font-medium dark:text-white">{username}</p>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full">
                      {hasSelected ? (
                        <FaCheck className="h-5 w-5 text-green-600 dark:text-green-500" />
                      ) : (
                        <FaTimes className="h-5 w-5 text-red-600 dark:text-red-500" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GroupDetails