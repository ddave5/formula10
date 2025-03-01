import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';

const StandingTable = ({data, type} : {data: any[], type: string}) => {

    const { t } = useTranslation();

    return (
        <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-950/80">
            <CardContent>
                <h2 className="text-xl font-semibold text-center">{type === "driver" ? t('groupHome.driverStanding') : t('groupHome.constructorStanding')}</h2>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="w-[100px]">{t('groupHome.position')}</TableCell>
                        <TableCell>{type === "driver" ? t('groupHome.driver') : t('groupHome.constructor')}</TableCell>
                        <TableCell className="text-right">{t('groupHome.points')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((result) => (
                    <TableRow key={result.position}>
                        <TableCell className="font-medium">{result.position}</TableCell>
                        <TableCell>{type === "driver" ? result.driver : result.constructor}</TableCell>
                        <TableCell className="text-right">{result.points}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
      );
}

export default StandingTable