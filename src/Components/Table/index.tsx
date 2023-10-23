import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Log } from "../../Types/Logs/logTypes";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type LogsTableProps = {
  logs?: Log[];
};

export const LogTable = ({ logs = [] }: LogsTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow data-testid="table-header-row">
            <StyledTableCell>IP Address</StyledTableCell>
            <StyledTableCell align="right">Operating System</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <StyledTableRow key={log.IPAddress} data-testid="table-row">
              <StyledTableCell
                component="th"
                scope="row"
                data-testid="ip-table-cell"
              >
                {log.IPAddress}
              </StyledTableCell>
              <StyledTableCell align="right" data-testid="os-table-cell">
                {log.OS}
              </StyledTableCell>
              <StyledTableCell align="right" data-testid="action-table-cell">
                {log.Action}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                data-testid="created-at-table-cell"
              >
                {log.date_created}
                {/* {log.createdAt
                  ? new Date(log.createdAt).toLocaleString()
                  : "N/A"} */}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
