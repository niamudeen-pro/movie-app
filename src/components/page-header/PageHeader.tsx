import styles from "./PageHeader.module.css";

type PageHeaderProps = {
    mainHeading?: string;
    subHeading?: string;
    children?: React.ReactNode
}
export default function PageHeader({ children, mainHeading, subHeading }: PageHeaderProps) {
    return (
        <section className={styles.hero__container}>
            <div className={`responsive__container ${styles.hero__content}`}>
                {mainHeading && <h1 className={styles.main__heading}>{mainHeading}</h1>}
                {subHeading && <p className={styles.subheading}>{subHeading}</p>}
                {children}
            </div>
        </section>
    )
}
