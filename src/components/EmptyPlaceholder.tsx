import EMPTY_PLACEHOLDER from '../assets/empty-placeholder.jpg'


export default function EmptyPlaceholder({ message }: { message?: string }) {
    return (
        <section className='flex__center empty__placeholder'>
            <img src={EMPTY_PLACEHOLDER} alt="Empty Placeholder" />
            {message && <p>{message}</p>}
        </section>
    )
}
