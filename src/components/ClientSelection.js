import FormTextField from './FormTextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const ClientSelection = ({ affaireDetails }) => (
  <>
    <FormTextField
      label="Client sélectionné"
      value={affaireDetails.clientName || ''}
      disabled
    />
    <DatePicker
      value={affaireDetails.date ? dayjs(affaireDetails.date) : dayjs()}
      label="Selected Date"
      renderInput={(params) => <FormTextField {...params} disabled />}
    />
  </>
);

export default ClientSelection;
