import React from "react";
import { Check, Trash2, Star, MessageSquare } from "lucide-react";
import { formatDate } from "../utils/adminDashboardUtils";

function CommentsTable({ rows, currentUser, onDelete, onApprove }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Comment</th>
          <th>Rating</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((item) => (
          <tr key={item.id}>
            <td>
              <div className="admin-name-cell">
                <div className="admin-avatar">{item.user?.name?.[0]?.toUpperCase() || "U"}</div>
                <div>
                  <strong>{item.user?.name || "Anonymous"}</strong>
                  <span>{item.user?.email}</span>
                </div>
              </div>
            </td>
            <td>
              <div className="comment-content-cell">
                <MessageSquare size={14} className="comment-icon" style={{ marginRight: '6px', opacity: 0.6, display: 'inline' }} />
                <span>{item.contenu}</span>
              </div>
            </td>
            <td>
              <div className="admin-rating-display" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    fill={i < (item.note || 0) ? "#f59e0b" : "none"}
                    stroke={i < (item.note || 0) ? "#f59e0b" : "#cbd5e1"}
                  />
                ))}
                <span className="rating-number" style={{ marginLeft: '4px', fontSize: '12px' }}>({item.note || 0})</span>
              </div>
            </td>
            <td>
              {item.approved ? (
                <span className="status-pill approved" style={{
                  color: "#10b981",
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "500"
                }}>
                  Approved
                </span>
              ) : (
                <span className="status-pill pending" style={{
                  color: "#f59e0b",
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "500"
                }}>
                  Pending
                </span>
              )}
            </td>
            <td>{formatDate(item.created_at)}</td>
            <td>
              <div className="admin-row-actions">
                {!item.approved && onApprove && (
                  <button
                    type="button"
                    className="icon-btn success"
                    onClick={() => onApprove(item)}
                    aria-label="Approve comment"
                    title="Approve comment"
                    style={{
                      color: "#10b981",
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      border: "none",
                      padding: "6px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginRight: "6px"
                    }}
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  type="button"
                  className="icon-btn danger"
                  onClick={() => onDelete("comments", item)}
                  aria-label="Delete comment"
                  title="Delete comment"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CommentsTable;
