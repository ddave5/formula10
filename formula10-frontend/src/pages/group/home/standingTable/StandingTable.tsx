import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../layout/navbar/Theme/ThemeContext';

const StandingTable = ({data, type} : {data: any[], type: string}) => {

    const { t } = useTranslation();
    const { theme } = useTheme();

    const darkText = { color: 'var(--color-font)' };

    return (
        <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-950/80">
            <CardContent>
                <h2 className="text-xl font-semibold text-center dark:text-[--color-font]">{type === "driver" ? t('groupHome.driverStanding') : t('groupHome.constructorStanding')}</h2>
                <Table sx={theme === 'dark' ? darkText : {}} >
                <TableHead>
                    <TableRow >
                        <TableCell className="w-[100px] dark:text-[--color-font]">{t('groupHome.position')}</TableCell>
                        <TableCell className='dark:text-[--color-font]'>{type === "driver" ? t('groupHome.driver') : t('groupHome.constructor')}</TableCell>
                        <TableCell className="text-right dark:text-[--color-font]">{t('groupHome.points')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((result) => (
                    <TableRow key={result.position}>
                        <TableCell className="font-medium dark:text-[--color-font]">{result.position}</TableCell>
                        <TableCell className='dark:text-[--color-font]'>{type === "driver" ? result.driver : result.constructor}</TableCell>
                        <TableCell className="text-right dark:text-[--color-font]">{result.points}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
      );
}

export default StandingTable