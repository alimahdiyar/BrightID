import { addOperation, reportAndHideConnection } from 'src/actions';
import { backupUser } from 'src/components/Onboarding/RecoveryFlow/thunks/backupThunks';
import { connection_levels } from 'src/utils/constants';
import { NodeApi } from 'src/api/brightId';

export const reportConnection =
  ({ id, reason, api }: { id: string; reason: ReportReason; api: NodeApi }) =>
  async (dispatch: Dispatch, getState: GetState) => {
    try {
      const {
        user: { id: brightId, backupCompleted },
      } = getState();

      // Change connection to REPORTED level
      const op = await api.addConnection(
        brightId,
        id,
        connection_levels.REPORTED,
        Date.now(),
        reason,
      );
      dispatch(addOperation(op));
      // remove connection from local storage
      dispatch(reportAndHideConnection({ id, reason }));
      if (backupCompleted) {
        await dispatch(backupUser());
      }
    } catch (err) {
      err instanceof Error ? console.warn(err.message) : console.log(err);
    }
  };
