import React, { useEffect, useState } from 'react'
import { Avatar, Card, CardContent, CardHeader, Chip } from '@mui/material';
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { getGroupMembersTipExist } from '../../../../services/tip.service';
import eventBus from '../../../../services/eventBus';
import { t } from 'i18next';
import { useGroup } from '../../../../context/GroupContext';
import { useLocation } from 'react-router-dom';
import Loading from '../../../../components/Loading/Loading';

const GroupDetails = () => {

  const { group } = useGroup();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [driverSelections, setDriverSelections] = useState<Record<string, boolean>>({});

  const location = useLocation();

  useEffect(() => {
    const getGroupMembers = async () => {
      try {
        const groupTips = await getGroupMembersTipExist(group?.id || +(location.pathname.split('/')[2]));

        setDriverSelections(groupTips);

        if (!groupTips) {
          setError('Failed to fetch race data');
          return;
        }
        
      } catch (error) {
        eventBus.emit('error', {message: t('messages.errorFetching')})
        setError(
          error instanceof Error ? error.message : 'Failed to fetch data'
        );
      } finally {
        setLoading(false);
      }
    };

    getGroupMembers();
  }, []);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
      return <div>{error}</div>;
  }

  // Get the counts for selected and not selected
  const selectedCount = Object.values(driverSelections).filter(Boolean).length
  const notSelectedCount = Object.keys(driverSelections).length - selectedCount

  return (
    <div className="w-full max-w-3xl mx-auto mt-4">
      <Card className="border-2 border-red-600/20 shadow-lg">
        <CardHeader 
          className="bg-gradient-to-r from-red-600/10 to-red-600/5" 
          title="F1 Driver Selection Status"
          subheader="Group members who have picked a Formula 1 driver"> 
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 my-2">
            <Chip 
              variant="outlined" 
              sx={{backgroundColor: '#e8f5e9', borderColor: '#a5d6a7', color: '#388e3c'}}
              label={`Selected: ${selectedCount}`} />
            <Chip 
              variant="outlined" 
              sx={{backgroundColor: '#ffebee', borderColor: '#ef9a9a', color: '#d32f2f'}}
              label={`Not Selected: ${notSelectedCount}`} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(driverSelections).map(([username, hasSelected]) => (
              <Card
                key={username}
                className={`overflow-hidden transition-all ${hasSelected ? "border-green-200" : "border-red-200"}`}
              >
                <div className={`h-2 ${hasSelected ? "bg-green-500" : "bg-red-500"}`} />
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className={`h-10 w-10 ${hasSelected ? "bg-green-100" : "bg-red-100"}`}>
                      {username.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{username}</p>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full">
                      {hasSelected ? (
                        <FaCheck className="h-5 w-5 text-green-600" />
                      ) : (
                        <FaTimes className="h-5 w-5 text-red-600" />
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