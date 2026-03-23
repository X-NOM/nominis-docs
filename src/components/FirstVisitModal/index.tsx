import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

type Props = {
  storageKey?: string; // localStorage key
  title?: string;
  children?: React.ReactNode;
};

export default function FirstVisitModal({
  storageKey = 'seen_tx_tracer_v1',
  title = 'Welcome to TX Tracer',
  children,
}: Props) {
  const [show, setShow] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(storageKey);
      if (!seen) setShow(true);
    } catch (e) {
      // ignore (SSR or blocked storage)
    }
  }, [storageKey]);

  function close() {
    try {
      if (dontShow) localStorage.setItem(storageKey, '1');
    } catch (e) {}
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>{children ?? <p>This page shows transaction traces — use depth carefully.</p>}</div>
        <label className={styles.checkbox}>
          <input type="checkbox" checked={dontShow} onChange={(e) => setDontShow(e.target.checked)} /> Don't show again
        </label>
        <div className={styles.actions}>
          <button className={styles.button} onClick={close}>Close</button>
        </div>
      </div>
    </div>
  );
}
