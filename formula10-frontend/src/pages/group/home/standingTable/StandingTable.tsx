import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'

const StandingTable = ({data, type} : {data: any[], type: string}) => {
    return (
        <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-950/80">
            <CardContent>
                <h2 className="text-xl font-semibold text-center">{type === "driver" ? "Driver Standing" : "Constructor Standing"}</h2>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="w-[100px]">Position</TableCell>
                        <TableCell>{type === "driver" ? "Driver" : "Constructor"}</TableCell>
                        <TableCell className="text-right">Points</TableCell>
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