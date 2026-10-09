import React, { useState } from 'react';
import { LogIn, Activity, ShieldCheck } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await onLogin(email, password);
        if (!res.success) {
            setError(res.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.backgroundGlow}></div>
            <div className="glass" style={styles.loginCard}>
                <div style={styles.header}>
                    <div style={styles.iconContainer}>
                        <Activity size={32} color="var(--primary)" />
                    </div>
                    <h1 style={styles.title}>HemoScan AI</h1>
                    <p style={styles.subtitle}>Advanced Blood Group Recognition System</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && <div style={styles.error}>{error}</div>}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Medical ID / Email</label>
                        <input
                            type="email"
                            required
                            style={styles.input}
                            placeholder="e.g. dr.smith@hospital.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Access Key</label>
                        <input
                            type="password"
                            required
                            style={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={styles.button}>
                        Authorize Access <LogIn size={18} style={{ marginLeft: '8px' }} />
                    </button>
                </form>

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        New to HemoScan?
                        <span onClick={() => window.dispatchEvent(new CustomEvent('switch-to-register'))} style={styles.link}> Create Account</span>
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
    loginCard: {
        width: '100%',
        maxWidth: '450px',
        padding: '48px',
        borderRadius: 'var(--radius-lg)',
        animation: 'scaleIn 0.6s ease-out',
        textAlign: 'center',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    header: {
        marginBottom: '32px',
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
        fontSize: '2rem',
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
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginBottom: '8px',
        marginLeft: '4px',
    },
    input: {
        width: '100%',
        padding: '14px 18px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.3s ease',
    },
    button: {
        width: '100%',
        marginTop: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        marginTop: '32px',
        textAlign: 'center',
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
};

export default LoginPage;
