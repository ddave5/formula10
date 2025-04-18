import { Card, CardContent, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../layout/navbar/Theme/ThemeContext';
import type { ReactNode } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { v4 as uuid} from 'uuid';

const TableComponent = ({title, header, body } : {
    title: string, 
    header: {text?: string, style?: string, hideIfMobileMode?: boolean}[], 
    body: {style: string, value: string | ReactNode, hideIfMobileMode?: boolean}[][]
}) => {
    const { t } = useTranslation();
    const {theme:appTheme} = useTheme();

    const width = useWindowWidth();

    const StyledTableHeaderRow = styled(TableRow)(( ) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: `${appTheme === "dark" ? 'rgb(55 65 81 / var(--tw-bg-opacity, 1))' : 'rgb(229 231 235 / var(--tw-bg-opacity, 1))'}`,
          borderTop: '1px solid rgba(224, 224, 224, 1)'
        }
    }))

    const StyledTableRow = styled(TableRow)(() => ({
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
                            {header.map((header) => (
                                header.hideIfMobileMode && width < 1024 ? null :
                                <TableCell className={`${header.style}`} key={header.text}>{header ? t(header.text || ""): ""}</TableCell>
                            ))}
                        </StyledTableHeaderRow>
                    </TableHead>
                    <TableBody>
                        {body.map((row, rowIndex) => (
                            <StyledTableRow key={row.length}>
                                {row.map((cell, cellIndex) => (
                                    cell.hideIfMobileMode && width < 1024 ? null :
                                    <TableCell className={`${cell.style}`} key={`${uuid()}`}>{cell.value}</TableCell>
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