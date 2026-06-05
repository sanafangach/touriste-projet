import React from 'react';
import { Crown, Shield, Trash2 } from 'lucide-react';

function UsersTable({
    users,
    user,
    currentLang,
    lang,
    deleteUser,
    toggleRole
}) {
    return (
        <div className="users-section">
            <div className="section-header">
                <h2>{currentLang.userList}</h2>

                <div className="section-count">
                    {users.length}{' '}
                    {lang === 'FR'
                        ? 'utilisateurs'
                        : lang === 'AR'
                        ? 'مستخدم'
                        : 'users'}
                </div>
            </div>

            <div className="table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>{currentLang.name}</th>
                            <th>{currentLang.email}</th>
                            <th>{currentLang.role}</th>
                            <th>{currentLang.actions}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr
                                key={u.id}
                                className={
                                    u.id === user?.id
                                        ? 'current-user'
                                        : ''
                                }
                            >
                                <td>#{u.id}</td>

                                <td>
                                    <div className="user-cell">
                                        <div className="cell-avatar">
                                            {u.name?.[0]?.toUpperCase()}
                                        </div>

                                        <span>{u.name}</span>
                                    </div>
                                </td>

                                <td>{u.email}</td>

                                <td>
                                    <span
                                        className={`role-badge ${u.role}`}
                                    >
                                        {u.role === 'admin' && (
                                            <Crown size={10} />
                                        )}

                                        {u.role}
                                    </span>
                                </td>

                                <td className="actions-cell">
                                    <button
                                        className={`action-btn role-btn ${
                                            u.role === 'admin'
                                                ? 'is-admin'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            toggleRole(
                                                u.id,
                                                u.role
                                            )
                                        }
                                        disabled={
                                            u.id === user?.id
                                        }
                                    >
                                        <Shield size={14} />
                                    </button>

                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() =>
                                            deleteUser(u.id)
                                        }
                                        disabled={
                                            u.id === user?.id
                                        }
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersTable;