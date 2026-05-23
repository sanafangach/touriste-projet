import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import '../css/ConfirmDialog.css';

function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
    isRTL = false,
}) {
    useEffect(() => {
        if (!open) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onCancel();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onCancel]);

    if (!open) return null;

    return (
        <div className="confirm-dialog-backdrop" role="presentation" onMouseDown={onCancel}>
            <div
                className={`confirm-dialog ${isRTL ? 'rtl' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-message"
                dir={isRTL ? 'rtl' : 'ltr'}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <button className="confirm-dialog-close" type="button" onClick={onCancel} aria-label={cancelLabel}>
                    <X size={18} />
                </button>

                <div className="confirm-dialog-icon" aria-hidden="true">
                    <AlertTriangle size={24} />
                </div>

                <div className="confirm-dialog-content">
                    <h2 id="confirm-dialog-title">{title}</h2>
                    <p id="confirm-dialog-message">{message}</p>
                </div>

                <div className="confirm-dialog-actions">
                    <button className="confirm-dialog-btn secondary" type="button" onClick={onCancel}>
                        {cancelLabel}
                    </button>
                    <button className="confirm-dialog-btn danger" type="button" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;
