import { useEffect, useState } from 'react';
import { Button } from './button';
import { Modal } from './modal';

export const AlertModal = ({ isOpen, onClose, onConfirm, loading, actionType, header, entityType }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

    // Determine the appropriate entity label (either "Seller" or "Admin")
    const entityLabel = entityType === 'admin' ? 'Admin' : 'Seller';

    // Determine the title based on actionType and entityLabel
    const title = actionType === 'Deactivate'
      ? `Deactivate ${entityLabel}`
      : actionType === 'Activate'
      ? `Activate ${entityLabel}`
      : actionType === 'Delete'
      ? `Delete ${entityLabel}`
      : '';

  return (
    <Modal
      title={title}
      description={header}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm mr-2"></span> {/* Optional spinner */}
              Loading...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    </Modal>
  );
};
