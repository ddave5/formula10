import { Card, CardContent, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../layout/navbar/Theme/ThemeContext';

const TableComponent = ({title, header, body } : {title: string, header: {text: string, style: string}[], body: {style: string, value: string}[][]}) => {
    const { t } = useTranslation();
    const {theme:appTheme} = useTheme();

    const StyledTableHeaderRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: `${appTheme === "dark" ? 'rgb(55 65 81 / var(--tw-bg-opacity, 1))' : 'rgb(229 231 235 / var(--tw-bg-opacity, 1))'}`,
          borderTop: '1px solid rgba(224, 224, 224, 1)'
        }
    }))

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
          backgroundColor: `${appTheme === "dark" ? 'rgb(55 65 81 / var(--tw-bg-opacity, 1))' : 'rgb(229 231 235 / var(--tw-bg-opacity, 1))'}`,
        }
      }));
    
    return (
        <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-950/80" sx={{ marginTop: "0 !important"}}>
            <CardContent>
                <h2 className="text-xl font-semibold text-center dark:text-[--color-font] mb-4">{t(title)}</h2>
                <Table>
                    <TableHead>
                        <StyledTableHeaderRow >
                            {header.map((header, index) => (
                                <TableCell className={`${header.style}`} key={index}>{t(header.text)}</TableCell>
                            ))}
                        </StyledTableHeaderRow>
                    </TableHead>
                    <TableBody>
                        {body.map((row, rowIndex) => (
                            <StyledTableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell className={`${cell.style}`} key={cellIndex}>{cell.value}</TableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default TableComponent