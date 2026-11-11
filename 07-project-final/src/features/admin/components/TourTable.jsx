import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ntd } from '../../../format.js';

export default function TourTable({ tours, onEdit, onDelete }) {
  return (
    <>
      <TableContainer
        elevation={0}
        className="rounded-card bg-white shadow-card mt-8 hidden overflow-x-auto md:block"
      >
        <Table>
          <TableHead>
            <TableRow>
              {['標題', '地區', '主題', '天數', '價格', '操作'].map((label) => (
                <TableCell key={label} className="px-4 py-3">
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell className="px-4 py-4">{tour.title}</TableCell>
                <TableCell className="px-4 py-4">{tour.region}</TableCell>
                <TableCell className="px-4 py-4">{tour.theme}</TableCell>
                <TableCell className="px-4 py-4">{tour.days} 天</TableCell>
                <TableCell className="px-4 py-4">{ntd(tour.price)}</TableCell>
                <TableCell className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="contained"
                      size="small"
                      disableElevation
                      color="primary"
                      onClick={() => onEdit(tour)}
                    >
                      編輯
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      disableElevation
                      color="error"
                      onClick={() => onDelete(tour)}
                    >
                      刪除
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-8 grid gap-4 md:hidden">
        {tours.map((tour) => (
          <Card key={tour.id} className="p-6">
            <h3 className="font-serif text-2xl font-semibold">{tour.title}</h3>
            <p className="mt-2 text-muted">
              {tour.region} · {tour.theme} · {tour.days} 天 · {ntd(tour.price)}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="contained"
                size="small"
                disableElevation
                color="primary"
                onClick={() => onEdit(tour)}
              >
                編輯
              </Button>
              <Button
                variant="contained"
                size="small"
                disableElevation
                color="error"
                onClick={() => onDelete(tour)}
              >
                刪除
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
