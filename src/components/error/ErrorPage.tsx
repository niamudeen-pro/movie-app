import styles from "./ErrorPage.module.css";

export default function ErrorPage({ message }: { message: string }) {
    return (
        <div className={styles.errorPage}>
            <h1 className={styles.errorPage__title}>Oops!</h1>
            <p className={styles.errorPage__message}>{message || "Something went wrong."}</p>
        </div>
    );
}
