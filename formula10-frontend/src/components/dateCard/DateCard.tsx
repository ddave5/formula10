import React from 'react'
import { Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DateCard = ({date, title, location}: {date: Date, title: string, location: string}) => {

    const { t } = useTranslation();

    function formatDate(date: Date): string {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        const hours = String(date.getHours()).padStart(2, "0")
        const minutes = String(date.getMinutes()).padStart(2, "0")
    
        return `${year}. ${month}. ${day}. ${hours}:${minutes}`
    }
    
    const formattedDate = formatDate(date)

    return (
        <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-950/80" sx={{ '&.MuiCard-root': { marginTop: '0 !important' }}}>
            <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-xl font-semibold text-primary dark:text-[--color-font]">{title}</h2>
                    <p className="text-md font-semibold text-center dark:text-[--color-font]">{t('groupHome.location')}: {t(`location.${location}`)}</p>
                    <p className="text-2xl font-bold tracking-tight text-center dark:text-[--color-font]">{formattedDate}</p>
                    <div className="w-full h-1 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300 rounded-full mt-2 dark:text-[--color-font]" />
                </div>
            </CardContent>
       </Card>
    )
}

export default DateCard