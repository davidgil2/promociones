import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DataTable = ({ promos }) => {
  DataTable.propTypes = {
    promos: PropTypes.array.isRequired,
  };

  if (!promos || promos.length === 0) {
    return <p>No hay promociones disponibles</p>;
  }

  const isPromotionActive = (startDate, endDate) => {
    const currentDate = new Date();
    return (
      currentDate >= new Date(startDate) && currentDate <= new Date(endDate)
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Nombre</StyledTableCell>
            <StyledTableCell align="right">Descripción</StyledTableCell>
            <StyledTableCell align="right">Descuento (%)</StyledTableCell>
            <StyledTableCell align="right">Activa</StyledTableCell>
            <StyledTableCell align="right">Ciudad</StyledTableCell>
            <StyledTableCell align="right">Fecha de inicio</StyledTableCell>
            <StyledTableCell align="right">Fecha de fin</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {promos.map((promo) => (
            <StyledTableRow key={promo.idPromo}>
              <StyledTableCell component="th" scope="row">
                {promo.idPromo}
              </StyledTableCell>
              <StyledTableCell align="right">{promo.name}</StyledTableCell>
              <StyledTableCell align="right">
                {promo.description}
              </StyledTableCell>
              <StyledTableCell align="right">
                {promo.discountPercentage}
              </StyledTableCell>
              <StyledTableCell align="right">
                {isPromotionActive(promo.startDate, promo.endDate)
                  ? "Sí"
                  : "No"}
              </StyledTableCell>
              <StyledTableCell align="right">{promo.city}</StyledTableCell>
              <StyledTableCell align="right">{promo.startDate}</StyledTableCell>
              <StyledTableCell align="right">{promo.endDate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
