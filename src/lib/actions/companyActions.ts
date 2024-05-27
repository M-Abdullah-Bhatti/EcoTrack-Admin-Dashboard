import { AppDispatch } from '../../lib/store';
import { deleteCompany } from '../../lib/features/companySlice';

export const deleteCompanyAsync = (companyId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/admin/companies/${companyId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(deleteCompany(companyId));
      console.log("Company Deleted")
    } else {
      console.error('Failed to delete company:', response.statusText);
    }
  } catch (error) {
    console.error('Failed to delete company:', error);
  }
};
