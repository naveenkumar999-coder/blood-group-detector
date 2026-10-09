import React, { useState, useEffect } from 'react';
import { Database, FolderOpen, RefreshCcw, CheckCircle2, AlertTriangle, Layers, FileImage } from 'lucide-react';

const DatasetPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPreprocessing, setIsPreprocessing] = useState(false);
    const [preprocessMessage, setPreprocessMessage] = useState('');

    const loadStats = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5001/api/dataset-stats');
            const data = await response.json();
            if (data.success) {
                setStats(data);
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (_err) {
            setError("Failed to connect to HemoScan Auth Server.");
        }
        setLoading(false);
    };

    const handlePreprocess = async () => {
        setIsPreprocessing(true);
        setPreprocessMessage('');
        try {
            const response = await fetch('http://localhost:5001/api/preprocess');
            const data = await response.json();
            if (data.success) {
                setPreprocessMessage(data.message);
            } else {
                setPreprocessMessage("Error: " + data.message);
            }
        } catch (err) {
            setPreprocessMessage("Failed to connect to server for pre-processing.");
        }
        setIsPreprocessing(false);
    };

    useEffect(() => {
        loadStats();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerTitle}>
                    <Database size={32} color="var(--primary)" />
                    <div>
                        <h1 style={styles.title}>Dataset Repository</h1>
                        <p style={styles.subtitle}>Analyzing local medical imaging dataset for training</p>
                    </div>
                </div>
                <button onClick={loadStats} disabled={loading} style={styles.refreshBtn}>
                    <RefreshCcw size={18} className={loading ? 'spin' : ''} /> Rescan Repository
                </button>
            </div>

            {error ? (
                <div className="glass" style={styles.errorCard}>
                    <AlertTriangle size={48} color="var(--error)" />
                    <h3>Dataset Connection Error</h3>
                    <p>{error}</p>
                    <p style={{ fontSize: '0.8rem', marginTop: '12px' }}>Please ensure D:\Dataset exists and the Auth Server is running.</p>
                </div>
            ) : loading ? (
                <div style={styles.loadingArea}>
                    <div className="loader"></div>
                    <p>Scanning D:\Dataset structure...</p>
                </div>
            ) : (
                <div style={styles.grid}>
                    <div className="glass" style={styles.mainCard}>
                        <div style={styles.cardHeader}>
                            <FolderOpen size={20} color="var(--primary)" />
                            <h3>Directory Structure: {stats.path}</h3>
                        </div>

                        <div style={styles.statsList}>
                            {Object.entries(stats.stats).map(([group, info]) => (
                                <div key={group} style={styles.statItem}>
                                    <div style={styles.statInfo}>
                                        <div style={styles.folderIcon}>
                                            <Layers size={20} />
                                            <span>Folder: <strong>{group}</strong></span>
                                        </div>
                                        <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>{info.count} Images</span>
                                    </div>
                                    <div style={styles.progressBar}>
                                        <div style={{ ...styles.progressFill, width: `${(info.count / stats.total) * 100}%` }}></div>
                                    </div>
                                    <div style={styles.itemFooter}>
                                        <span style={{ color: info.status === 'Ready' ? 'var(--success)' : 'var(--error)' }}>
                                            <CheckCircle2 size={14} style={{ marginRight: '4px' }} /> {info.status}
                                        </span>
                                        <span style={styles.percentage}>{Math.round((info.count / stats.total) * 100)}% of total</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={styles.summaryBox}>
                            <div style={styles.summaryItem}>
                                <span>Total Images Discovered</span>
                                <strong>{stats.total}</strong>
                            </div>
                            <div style={styles.summaryItem}>
                                <span>Categories Validated</span>
                                <strong>4 / 4</strong>
                            </div>
                            <div style={styles.summaryItem}>
                                <span>Ready for Training</span>
                                <strong style={{ color: 'var(--success)' }}>YES</strong>
                            </div>
                        </div>
                    </div>

                    <div style={styles.sideColumn}>
                        <div className="glass" style={styles.infoCard}>
                            <h3>Dataset Guidelines</h3>
                            <ul style={styles.list}>
                                <li>Images must be in .jpg or .png format</li>
                                <li>Minimum resolution: 224x224 px</li>
                                <li>Folders must be named A, B, AB, O</li>
                                <li>Transparent labels preferred for CNN</li>
                            </ul>
                        </div>
                        <div className="glass" style={styles.actionCard}>
                            <FileImage size={40} color="var(--primary)" style={{ marginBottom: '16px' }} />
                            <h4>Pre-process Data</h4>
                            <p style={styles.cardText}>Normalize and resize all images for HemoScan Neural Engine.</p>
                            <button
                                className="btn-primary"
                                style={{ width: '100%', marginTop: '16px', opacity: isPreprocessing ? 0.7 : 1, cursor: isPreprocessing ? 'not-allowed' : 'pointer' }}
                                onClick={handlePreprocess}
                                disabled={isPreprocessing}
                            >
                                {isPreprocessing ? 'Processing...' : 'Run Pre-processing'}
                            </button>
                            {preprocessMessage && (
                                <p style={{ fontSize: '0.85rem', marginTop: '12px', color: preprocessMessage.includes('Error') || preprocessMessage.includes('Failed') ? 'var(--error)' : 'var(--success)' }}>
                                    {preprocessMessage}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '32px',
        maxWidth: '1200px',
        margin: '0 auto',
        animation: 'fadeIn 0.6s ease-out',
    },
    header: {
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    title: {
        fontSize: '2rem',
        fontWeight: '700',
    },
    subtitle: {
        color: 'var(--text-muted)',
        fontSize: '0.95rem',
    },
    refreshBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--glass-border)',
        padding: '10px 20px',
        borderRadius: 'var(--radius-md)',
        color: 'white',
        fontSize: '0.9rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: '32px',
    },
    mainCard: {
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '32px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--glass-border)',
    },
    statsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        marginBottom: '40px',
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    statInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    folderIcon: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'var(--text-muted)',
    },
    progressBar: {
        height: '8px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        background: 'var(--gradient-main)',
    },
    itemFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.85rem',
    },
    percentage: {
        color: 'var(--text-muted)',
    },
    summaryBox: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        background: 'rgba(255, 255, 255, 0.02)',
        padding: '24px',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
        gap: '24px',
    },
    summaryItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        fontSize: '0.9rem',
    },
    sideColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    infoCard: {
        padding: '24px',
        borderRadius: 'var(--radius-md)',
    },
    list: {
        marginTop: '16px',
        paddingLeft: '20px',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        lineHeight: '2',
    },
    actionCard: {
        padding: '24px',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(255, 77, 77, 0.05) 0%, rgba(15, 17, 26, 0) 100%)',
    },
    cardText: {
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginTop: '8px',
        lineHeight: '1.4',
    },
    loadingArea: {
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        color: 'var(--text-muted)',
    },
    errorCard: {
        padding: '60px',
        textAlign: 'center',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(214, 48, 49, 0.2)',
    },
    card: {
        padding: '24px',
        borderRadius: 'var(--radius-md)',
    },
};

export default DatasetPage;
