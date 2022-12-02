import { FC } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./Table.module.scss";

interface TableRow {
  label: string;
  value: string;
}

interface TableProps {
  rows: Array<TableRow>;
}

/**
 * Displays a simple table for the transaction panel
 *
 * @param props the table rows
 * @returns table component
 */
const Table: FC<TableProps> = (props: TableProps) => {
  const { rows } = props;

  return (
    <Box className={styles.root} style={{ marginTop: "24px" }}>
      {rows.map((row, index) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: index > 0 ? "10px" : "",
          }}
        >
          <Typography className={styles.label}>{row.label}</Typography>
          <Typography className={styles.value}>{row.value}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Table;
