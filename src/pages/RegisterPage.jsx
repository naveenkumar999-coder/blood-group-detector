import React, { useState } from 'react';
import { UserPlus, Activity, ShieldCheck, Mail, Lock, User } from 'lucide-react';

const RegisterPage = ({ onRegister, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        hospital: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await onRegister(formData);
        if (res.success) {
            alert("Account created successfully! Please login.");
            onSwitchToLogin();
        } else {
            setError(res.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.backgroundGlow}></div>
            <div className="glass" style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.iconContainer}>
                        <UserPlus size={32} color="var(--primary)" />
                    </div>
                    <h1 style={styles.title}>Create Account</h1>
                    <p style={styles.subtitle}>Join the HemoScan AI Medical Network</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && <div style={styles.error}>{error}</div>}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <div style={styles.inputWrapper}>
                            <User size={18} style={styles.inputIcon} />
                            <input
                                type="text"
                                required
                                style={styles.input}
                                placeholder="Dr. John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Hospital/Clinic Name</label>
                        <input
                            type="text"
                            required
                            style={styles.input}
                            placeholder="City Medical Centre"
                            value={formData.hospital}
                            onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Medical Email</label>
                        <div style={styles.inputWrapper}>
                            <Mail size={18} style={styles.inputIcon} />
                            <input
                                type="email"
                                required
                                style={styles.input}
                                placeholder="name@hospital.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Access Key (Password)</label>
                        <div style={styles.inputWrapper}>
                            <Lock size={18} style={styles.inputIcon} />
                            <input
                                type="password"
                                required
                                style={styles.input}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={styles.button}>
                        Register Account <UserPlus size={18} style={{ marginLeft: '8px' }} />
                    </button>
                </form>

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        Already have an account?
                        <span onClick={onSwitchToLogin} style={styles.link}> Login here</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '20px',
    },
    backgroundGlow: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255, 77, 77, 0.15) 0%, rgba(15, 17, 26, 0) 70%)',
        zIndex: -1,
    },
    card: {
        width: '100%',
        maxWidth: '480px',
        padding: '40px',
        borderRadius: 'var(--radius-lg)',
        animation: 'scaleIn 0.6s ease-out',
        textAlign: 'center',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    header: {
        marginBottom: '24px',
    },
    iconContainer: {
        marginBottom: '16px',
        display: 'inline-block',
        padding: '12px',
        borderRadius: '50%',
        background: 'rgba(255, 77, 77, 0.1)',
        animation: 'pulse 2s infinite alternate, float 3s ease-in-out infinite',
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: '700',
        marginBottom: '8px',
        background: 'var(--gradient-main)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: {
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
    },
    form: {
        textAlign: 'left',
    },
    inputGroup: {
        marginBottom: '16px',
    },
    label: {
        display: 'block',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginBottom: '6px',
        marginLeft: '4px',
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: '14px',
        color: 'var(--text-muted)',
    },
    input: {
        width: '100%',
        padding: '12px 18px 12px 42px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'white',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'all 0.3s ease',
    },
    button: {
        width: '100%',
        marginTop: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '14px',
    },
    error: {
        background: 'rgba(255, 77, 77, 0.1)',
        color: '#ff4d4d',
        padding: '10px',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.85rem',
        marginBottom: '16px',
        textAlign: 'center',
        border: '1px solid rgba(255, 77, 77, 0.2)',
    },
    footer: {
        marginTop: '24px',
    },
    footerText: {
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
    },
    link: {
        color: 'var(--primary)',
        cursor: 'pointer',
        fontWeight: '600',
        marginLeft: '4px',
        transition: 'opacity 0.2s',
        '&:hover': {
            opacity: 0.8
        }
    },
};

export default RegisterPage;
