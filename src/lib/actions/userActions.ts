import { AppDispatch } from '../../lib/store';
import { deleteUser } from '../../lib/features/usersSlice';

export const deleteUserAsync = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/admin/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(deleteUser(userId));
    } else {
      console.error('Failed to delete user:', response.statusText);
    }
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};
