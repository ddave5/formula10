import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useTheme } from '../../layout/navbar/Theme/ThemeContext'
import { useTranslation } from 'react-i18next';

const TableComponent = ({title, header, body } : {title: string, header: {text: string, style: string}[], body: {style: string, value: string}[][]}) => {

    const { theme } = useTheme();
    const { t } = useTranslation();
    
    return (
        <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-950/80">
            <CardContent>
                <h2 className="text-xl font-semibold text-center dark:text-[--color-font]">{t(title)}</h2>
                <Table sx={theme === 'dark' ? { color: 'var(--color-font)' } : {}} >
                    <TableHead>
                        <TableRow >
                            {header.map((header, index) => (
                                <TableCell className={`${header.style}`} key={index}>{t(header.text)}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {body.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell className={`${cell.style}`} key={cellIndex}>{cell.value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default TableComponent