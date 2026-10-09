import React from 'react';
import { User, Mail, Building, Shield, ChevronLeft, Calendar, Award } from 'lucide-react';

const ProfilePage = ({ user, onBack }) => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={onBack} style={styles.backBtn}>
                    <ChevronLeft size={20} /> Back to Dashboard
                </button>
                <h1 style={styles.title}>Medical Profile</h1>
            </div>

            <div style={styles.grid}>
                <div className="glass" style={styles.mainCard}>
                    <div style={styles.avatarContainer}>
                        <div style={styles.avatar}>
                            <User size={48} color="var(--primary)" />
                        </div>
                        <h2 style={styles.userName}>{user.name}</h2>
                        <p style={styles.userRole}>Licensed Medical professional</p>
                    </div>

                    <div style={styles.infoList}>
                        <div style={styles.infoItem}>
                            <Mail size={18} color="var(--text-muted)" />
                            <div>
                                <p style={styles.infoLabel}>Email Address</p>
                                <p style={styles.infoValue}>{user.email}</p>
                            </div>
                        </div>
                        <div style={styles.infoItem}>
                            <Building size={18} color="var(--text-muted)" />
                            <div>
                                <p style={styles.infoLabel}>Organization</p>
                                <p style={styles.infoValue}>{user.hospital || 'Private Practice'}</p>
                            </div>
                        </div>
                        <div style={styles.infoItem}>
                            <Shield size={18} color="var(--text-muted)" />
                            <div>
                                <p style={styles.infoLabel}>Security Clearane</p>
                                <p style={styles.infoValue}>Level 4 (Neural Diagnostic Access)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.sideColumn}>
                    <div className="glass" style={styles.statCard}>
                        <Award size={24} color="var(--primary)" style={{ marginBottom: '12px' }} />
                        <h3 style={styles.statValue}>1,280+</h3>
                        <p style={styles.statLabel}>Analyses Performed</p>
                    </div>
                    <div className="glass" style={styles.statCard}>
                        <Calendar size={24} color="var(--success)" style={{ marginBottom: '12px' }} />
                        <h3 style={styles.statValue}>Active</h3>
                        <p style={styles.statLabel}>Since Feb 2026</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px',
        maxWidth: '1000px',
        margin: '0 auto',
        animation: 'fadeIn 0.6s ease-out',
    },
    header: {
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        padding: '8px 16px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--glass-border)',
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: '700',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '24px',
    },
    mainCard: {
        padding: '40px',
        borderRadius: 'var(--radius-lg)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    avatarContainer: {
        textAlign: 'center',
        marginBottom: '40px',
        paddingBottom: '40px',
        borderBottom: '1px solid var(--glass-border)',
    },
    avatar: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'rgba(255, 77, 77, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 20px',
        border: '2px solid var(--glass-border)',
        animation: 'float 3s ease-in-out infinite',
    },
    userName: {
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '4px',
    },
    userRole: {
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    infoList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
    },
    infoLabel: {
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        marginBottom: '4px',
    },
    infoValue: {
        fontSize: '1rem',
        fontWeight: '500',
    },
    sideColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    statCard: {
        padding: '24px',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
    },
    statValue: {
        fontSize: '1.8rem',
        fontWeight: '700',
        marginBottom: '4px',
    },
    statLabel: {
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
    },
};

export default ProfilePage;
